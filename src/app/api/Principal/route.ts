
import { dbConnection } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

import { middleware } from "@/middleware";
import User from "@/models/user.model";
import Student from "@/models/student.model";
import Coordinator from "@/models/coordinator.model";

import { ROLE } from "@/constants/constant";

import mongoose from "mongoose";

import LeaveForm, { IForm } from "@/models/form.model";

import { NextApiRequest } from "next";

import { IUser } from "@/models/user.model";

import { Document, Model, PopulatedDoc } from 'mongoose';

import { principalDD } from "@/constants/buttonConst";



dbConnection();

interface CustomNextRequest extends NextRequest {

    user: string,
}



async function fetchIndividualDetails(refId: any) {

    try {

        let ActualRole;

        //   switch (role) {

        //     case ROLE.Coordinator:
        //       ActualRole = mongoose.model(ROLE.Coordinator);
        //       break;
        //     case ROLE.Principal:
        //       ActualRole = mongoose.model(ROLE.Principal);
        //       break;
        //     case ROLE.Warden:
        //       ActualRole = mongoose.model(ROLE.Warden);
        //       break;
        //     case ROLE.Admin:
        //       ActualRole = mongoose.model(ROLE.Admin);
        //       break;
        //     case ROLE.Student:
        //       ActualRole = Student;
        //       break;
        //     default:
        //       throw new Error(`Invalid role: ${role}`);
        //   }


        const IndividualDetails = await User.findOne({

            refId: refId,

        }).select("-password -isVerified -token -tokenExpiry").populate({

            path: "refId",
            select: "-qrCode"

        }).exec();



        if (!IndividualDetails) {

            throw new Error(`No individual found with refId: ${refId}`);

        }


        return IndividualDetails;

    } catch (error: any) {

        console.log(error.message);

        throw new Error(`Server failed to fetch Individual Details: ${error.message}`);

    }
}





async function fetchCoordinatorDetails(programe: any, branch: any) {

    try {

        const coordinatorDetails = await Coordinator.findOne({


            programe: programe,
            branches: {

                $in: [branch],
            }
        })


        return coordinatorDetails;


    } catch (error: any) {


        console.log(error);

        throw new Error("Server failed to findout coordinator details", error.message);

    }
}






async function fetchStudentDetails(programe: any, branch: any) {

    try {

        const studentDetails = await Student.find({

            programe: programe,
            branch: branch

        })

        const individualDetailsPromises = studentDetails.map((student) =>

            fetchIndividualDetails(student._id)

        );

        const individualDetails = await Promise.all(individualDetailsPromises);

        return individualDetails;


    } catch (error: any) {

        console.log(error);

        throw new Error("Server failed to findout student details", error.message);

    }
}





interface IQuery {

    dateFrom: { $lte: Date };
    dateTo: { $gte: Date };
    $or?: { [key: string]: string }[];
}




async function getStudentOnLeave(dateFrom: any, dateTo: any, status?: string, text?: string): Promise<any[]> {


    // 1. fetch the data on the basis of the given date 

    // 2. 

    try {


        const query: any = {
            dateFrom: { $lte: dateTo },
            dateTo: { $gte: dateFrom }
        };

        // Apply status filter if provided
        if (status) {
            query.$or = [
                { 'status.coordinator': status },
                { 'status.hostelWarden': status }
            ];
        }

        // Fetch leave forms based on the query
        let studentInfo = await LeaveForm.find(query)
            .select("") // Exclude 'status' field
            .populate({
                path: 'user',
                select: '-password -isVerified -token -tokenExpiry', // Exclude sensitive user fields
                populate: {
                    path: 'refId',
                    // select: 'enrollmentNo fingerNo branch roomNo hostel' // Include fields for text search
                }
            }).sort({

                dateFrom: -1
            })
            .exec();

        console.log("all leave form info ", studentInfo);


        const excludedRoles = ['Admin', 'Principal', 'Gatekeeper', 'Warden'];

        // If no text filter is provided, return the filtered list by role

        if (!text) {

            return studentInfo.filter((data: any) => !excludedRoles.includes(data?.user?.role));

        }

        // Initialize newStudentInfo as an array

        let newStudentInfo: any[] = [];

        // Convert text to lowercase for case-insensitive comparison

        const searchText = text.toLowerCase();

        studentInfo.forEach((data: any) => {

            if (!excludedRoles.includes(data?.user?.role)) {

                if ((

                    data?.user?.fullName.toLowerCase().includes(searchText) ||
                    data?.user?.email.toLowerCase().includes(searchText) ||
                    data?.user?.contactNo.toLowerCase().includes(searchText) ||
                    data?.user?.refId?.enrollmentNo.toLowerCase().includes(searchText) ||
                    data?.user?.refId?.fingerNo.toLowerCase().includes(searchText) ||
                    data?.user?.refId?.branch.toLowerCase().includes(searchText) ||
                    data?.user?.refId?.roomNo.toLowerCase().includes(searchText) ||
                    data?.user?.refId?.hostel.toLowerCase().includes(searchText)) &&
                    !excludedRoles.includes(data?.user?.role)

                ) {

                    newStudentInfo.push(data);

                }
            }
        });

        console.log("student info", newStudentInfo);

        // successfully return the response;
        return newStudentInfo;

    } catch (error: any) {

        console.error(`Failed to retrieve students on leave: ${error.message}`);
        throw new Error(`Failed to retrieve students on leave: ${error.message}`);

    }
}





async function searchStudentByText(text: any) {


    try {

        console.log("text is ", text);

        // Search in User schema

        const excludedRoles = ['Admin', 'Principal', 'Gatekeeper', 'Warden'];

        let userDetails;

        userDetails = await User.find({
            $or: [
                { fullName: { $regex: text, $options: 'i' } },
                { email: { $regex: text, $options: 'i' } },
                { contactNo: { $regex: text, $options: 'i' } }
                // Add more fields if needed
            ],
            role: { $nin: excludedRoles } // Exclude admin and principal

        }).populate("refId").sort({ fullName: 1 }).exec();


        console.log("user details ", userDetails);

        if (userDetails.length === 0) {

            console.log("hellow ");

            // Search in Student schema

            const studentDetails = await Student.find({

                $or: [

                    { parentName: { $regex: text, $options: 'i' } },
                    { enrollmentNo: { $regex: text, $options: 'i' } },
                    { hostel: { $regex: text, $options: 'i' } },
                    { parentContactNo: { $regex: text, $options: 'i' } },
                    { branch: { $regex: text, $options: 'i' } },
                    { college: { $regex: text, $options: 'i' } },
                    { fingerNo: { $regex: text, $options: 'i' } },
                    { roomNo: { $regex: text, $options: 'i' } },
                    { programe: { $regex: text, $options: 'i' } },

                    // Add more fields if needed
                ],
            });

            console.log("1");


            // Convert the studentDetails array to an array of IndividualDetails

            userDetails = await Promise.all(

                studentDetails.map((student) => fetchIndividualDetails(student._id))

            );

        }


        return userDetails;


    } catch (error: any) {

        console.error(error.message);

        throw new Error('Search failed');

    }
}




async function getCoordinatorHistory() {
    try {
        // Fetch leave forms with status either "Accepted" or "Rejected" by the coordinator
        let studentInfo = await LeaveForm.find({
            'status.coordinator': {
                $in: ["Accepted", "Rejected"]
            }
        })
        .populate({
            path: 'user',
            select: '-password -isVerified -token -tokenExpiry', // Exclude sensitive user fields
            populate: {
                path: 'refId',
                // select: 'enrollmentNo fingerNo branch roomNo hostel' // Include fields for text search
            }
        })
        .sort({
            dateFrom: -1
        })
        .exec();

        console.log("Coordinator history:", studentInfo);

        // Return the fetched data
        return studentInfo; 

    } catch (error: any) {
        console.error(`Error while getting coordinator history: ${error.message}`);
        throw new Error('Error occurred while getting coordinator history');
    }
}




async function gethostelWardenHistory() {
    try {
        // Fetch leave forms with status either "Accepted" or "Rejected" by the coordinator
        let studentInfo = await LeaveForm.find({
            'status.hostelWarden': {
                $in: ["Accepted", "Rejected"]
            }
        })
        .populate({
            path: 'user',
            select: '-password -isVerified -token -tokenExpiry', // Exclude sensitive user fields
            populate: {
                path: 'refId',
                // select: 'enrollmentNo fingerNo branch roomNo hostel' // Include fields for text search
            }
        })
        .sort({

            dateFrom: -1
        })
        .exec();

        console.log("warden  history:", studentInfo);

        // Return the fetched data

        return studentInfo; 

    } catch (error: any) {

        console.error(`Error while getting coordinator history: ${error.message}`);
        
        throw new Error('error occur while getting hostelWarden history');
    }
}




async function getPrincipalHistory() {
    try {
        // Fetch leave forms with status either "Accepted" or "Rejected" by the coordinator
        let studentInfo = await LeaveForm.find({
            'status.hostelWarden': {
                $in: ["Accepted", "Rejected"]
            }
        })
        .populate({
            path: 'user',
            select: '-password -isVerified -token -tokenExpiry', // Exclude sensitive user fields
            populate: {
                path: 'refId',
                // select: 'enrollmentNo fingerNo branch roomNo hostel' // Include fields for text search
            }
        })
        .sort({

            dateFrom: -1
        })
        .exec();

        console.log("warden  history:", studentInfo);

        // Return the fetched data

        return studentInfo; 

    } catch (error: any) {

        console.error(`Error while getting coordinator history: ${error.message}`);
        
        throw new Error('error occur while getting hostelWarden history');
    }
}





export async function GET(req: CustomNextRequest, res: NextResponse) {

    try {

        // Apply middleware for request processing (authentication, etc.)

        await middleware(req);

        // Extract user ID from request

        const userId = req.user;

        // If user ID is missing, return unauthorized response

        // const {action, dateFrom, dateTo,  userId} = req.query;

        // console.log(action, dateFrom ,userId,dateTo );

        console.log("helow");

        // Destructure query parameters

        const { action = "", dateFrom = "", dateTo = "", programe = "", text = "", branch = "", status = "" } = Object.fromEntries(req.nextUrl.searchParams.entries())

        // const {action, dateFrom,dateTo} = req.URLSearchParams;

        console.log(action, dateFrom, dateTo, programe, text, branch, status);


        if (!userId) {

            return NextResponse.json(
                {
                    message: "User ID is not provided",
                    error: "",
                    data: null,
                    success: false
                },
                {
                    status: 401
                }
            );
        }

        // Find user details by ID

        const userDetails = await User.findById(userId);

        console.log("user details ", userDetails);

        // Destructure query parameters


        // Handle different actions based on the 'action' query parameter

        switch (action as string) {

            case "fetchCoordinatorDetails":

                // Fetch coordinator details based on program and branch

                const coordinatorDetails = await fetchCoordinatorDetails(programe, branch);

                return NextResponse.json({

                    message: "Coordinator details fetched successfully",
                    error: "",
                    data: coordinatorDetails,
                    success: true

                });

            case "fetchStudentDetails":

                // Fetch student details based on program and branch

                const studentDetails = await fetchStudentDetails(programe, branch);

                return NextResponse.json({

                    message: "Student details fetched successfully",
                    error: "",
                    data: studentDetails,
                    success: true

                });

            case "searchStudentByText":

                // Search users/students by text query

                const searchResults = await searchStudentByText(text);

                return NextResponse.json({

                    message: "User search completed successfully",
                    error: "",
                    data: searchResults,
                    success: true

                });

            case "getStudentOnLeave":

                // Get students on leave within a date range and optional status

                const studentsOnLeave = await getStudentOnLeave(dateFrom, dateTo, status, text);

                return NextResponse.json({

                    message: "Students on leave fetched successfully",
                    error: "",
                    data: studentsOnLeave,
                    success: true

                });

            case "getCoordinatorHistory":

                // Fetch coordinator details based on program and branch

                const coordinatorHistoryData = await getCoordinatorHistory();

                return NextResponse.json({

                    message: "Coordinator history fetched successfully",
                    error: "",
                    data: coordinatorHistoryData,
                    success: true

                });

            case "gethostelWardenHistory":

                const getHostelWardenHistoryData = await gethostelWardenHistory();

                return NextResponse.json({

                    message: "Coordinator history fetched successfully",
                    error: "",
                    data: getHostelWardenHistoryData,
                    success: true

                });

            
            case "getPrincipalHistory" :

                const principalHistoryData = await getPrincipalHistory();

                return NextResponse.json({

                    message: "Coordinator history fetched successfully",
                    error: "",
                    data: principalHistoryData,
                    success: true

                });


            default:

                // Handle unknown action

                return NextResponse.json(
                    {
                        message: `Unsupported action: ${action}`,
                        error: "",
                        data: null,
                        success: false
                    },
                    {
                        status: 400
                    }
                );
        }

    } catch (error: any) {


        console.error("Error occurred while processing request:", error);

        // Return internal server error response

        return NextResponse.json(
            {
                message: "Some error occurred while fetching user details",
                error: error.message,
                data: null,
                success: false
            },
            {
                status: 500
            }
        );
    }

}






