import { ROLE, STATUS } from "@/constants/constant";
import { compareDates } from "@/helper/compareDates";
import { middleware } from "@/middleware";
import LeaveForm from "@/models/form.model";
import Student, { IStudent } from "@/models/student.model";
import User, { IUser } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import Warden, { IWarden } from "@/models/warden.model";
import Coordinator, { ICoordinator } from "@/models/coordinator.model";
import { IPrincipal } from "@/models/principal.model";


interface CustomNextRequest extends NextRequest {
    user: string,
}


const leaveFormSchema = z.object({
    dateFrom: z.date(),
    dateTo: z.date(),
    reasonForLeave: z.string(),
    addressDuringLeave: z.string(),
});


// Define the type guard function
function isCoordinator(refId: IStudent | IWarden | ICoordinator | IPrincipal): refId is ICoordinator {
    return (refId as ICoordinator).branches !== undefined;
}


// Define the type guard function
function isWarden(refId: IStudent | IWarden | ICoordinator | IPrincipal): refId is IWarden {
    return (refId as IWarden).hostel !== undefined;
}



async function getStudentQuery(user: IUser) {

    const allApplications = await LeaveForm
        .find({ user: user._id })
        .populate({
            path: "user",
            populate: {
                path: "refId",
                select: "enrollmentNo branch programe"
            },
            select: "fullName profileImage refId _id"
        })
        .exec();

    return allApplications;
}



async function getAdminQuery(user: IUser) {
    return 'leaveForm'
}


async function getCoordinatorQuery(user: IUser) {
    let allApplications;

    // populate
    const populatedUser = await Coordinator.findById(user.refId)

    if (isCoordinator(populatedUser)) {
        allApplications = await LeaveForm.find()
            .populate(
                {
                    path: 'user',
                    populate: {
                        path: 'refId',
                        select: "enrollmentNo branch programe",
                        match: { programe: { $in: populatedUser.branches } },
                    },
                    select: "fullName profileImage refId _id"
                }
            )
            .where("status.coordinator").equals(STATUS.Pending);
    } else {
        // Handle the case where user.refId is not a coordinator
    }

    return allApplications;
}


async function getWardenQuery(user: IUser) {
    const populatedUser = await Warden.findById(user.refId)


    if (isWarden(populatedUser)) {

        const allApplications = await LeaveForm.find({})
            .populate(
                {
                    path: 'user',
                    populate: {
                        path: 'refId',
                        select: "enrollmentNo branch hostel programe",
                        match: { hostel: { $eq: populatedUser.hostel } },
                    },
                    select: "fullName profileImage refId _id"
                }
            )
            .where({
                $and: [
                    { "status.coordinator": STATUS.Accepted },
                    { "status.hostelWarden": STATUS.Pending }
                ]
            });

        return allApplications;
    } else {
        return null;
    }
}

async function getPrincipalQuery(user: IUser) {
    console.log("princ: ", user)

    const allApplications = await LeaveForm.find({
        'user.refId.college': { $eq: "CCSIT" }
    })
        .populate('user')
        .populate('user.refId')
        .exec();

    return allApplications;
}


async function getApplicationsByRole(user: IUser) {

    switch (user.role) {
        case ROLE.Coordinator:
            return await getCoordinatorQuery(user)

        case ROLE.Principal:
            return await getPrincipalQuery(user)

        case ROLE.Warden:
            return await getWardenQuery(user)

        case ROLE.Admin:
            return await getAdminQuery(user)

        case ROLE.Student:
            return await getStudentQuery(user)
        default:
            return [];
    }
}



export const GET = async (req: CustomNextRequest, res: NextResponse) => {
    try {

        await middleware(req);
        const userId = req.user;

        const user = await User
            .findById(userId)
            .select("_id role refId");

        console.log("user: ", user)

        const allForms = await getApplicationsByRole(user);

        return NextResponse
            .json(
                {
                    message: "Fetch all leave form successfully",
                    error: null,
                    // data: allForms,
                    success: true,
                }, {
                status: 200
            });

    } catch (error: any) {

        return NextResponse
            .json(
                {
                    message: "Server failed to fetch all form, try again later",
                    error: error.message,
                    data: null,
                    success: false,
                },
                {
                    status: 500
                }
            );
    }
}



export const PATCH = async (req: CustomNextRequest, res: NextResponse) => {
    try {

        await middleware(req);

        const body = await req.json();
        const { formId, result } = body;
        const userId = req.user;

        const form = await LeaveForm.findById(formId);

        const user = await User.findById(userId).populate("refId", "_id");

        if (!form || !user) {
            return NextResponse
                .json(
                    {
                        message: "Form or user not found",
                        error: "Form not found",
                        data: null,
                        success: false,
                    }, {
                    status: 404
                });
        }

        // if other who is not authorize
        if (user.role !== ROLE.Coordinator && user.role !== ROLE.Warden) {
            return NextResponse
                .json(
                    {
                        message: "User role is not authorize",
                        error: "User role is not authorize",
                        data: null,
                        success: false,
                    }, {
                    status: 401
                });
        }

        // if coordinator
        if (user.role === ROLE.Coordinator) {

            form.status.coordinator = result ? STATUS.Accepted : STATUS.Rejected;

        }

        // if hostel warden
        if (user.role === ROLE.Warden) {
            // if result is true then set status and create qr code and put into user db
            if (result) {
                // set status
                form.status.hostelWarden = STATUS.Accepted;

                const uuid = uuidv4();

                // create qr code
                const qrCodeString: string = `${formId}-${uuid}`;

                await Student.findByIdAndUpdate(
                    user.refId._id,
                    { $set: { "qrCode.qrString": qrCodeString } },
                    { new: true }
                );

            } else {
                // if not then set status
                form.status.hostelWarden = STATUS.Rejected;

            }

        }

        await form.save();

        return NextResponse
            .json(
                {
                    message: "Leave form update successfully",
                    error: null,
                    data: null,
                    success: true,
                }, {
                status: 200
            });

    } catch (error: any) {
        return NextResponse
            .json(
                {
                    message: "Server failed to update form, try again later",
                    error: error.message,
                    data: null,
                    success: false,
                },
                {
                    status: 500
                }
            );
    }
}


export async function POST(req: CustomNextRequest, res: NextResponse) {

    try {
        // initializing body
        const body = await req.json();

        await middleware(req);


        const userId = req.user;

        console.log("user: ", userId)

        // validation by parsing
        try {
            leaveFormSchema.safeParse(body);
        } catch (err) {
            return NextResponse.json(
                {
                    message: "Validation error in parsing data",
                    error: err,
                    data: null,
                    success: false,
                }, {
                status: 400
            }
            );
        }

        // getting data by destructuring
        const {
            dateFrom,
            dateTo,
            reasonForLeave,
            addressDuringLeave
        } = body;

        // check if user exist or not
        const userExist = await User.findById(userId);

        if (!userExist) {
            return NextResponse.json(
                {
                    message: "user does not exist",
                    success: false,
                    error: "user does not exist",
                    data: null
                },
                {
                    status: 404
                }
            );
        }

        // create entry in db 
        const leaveForm = await LeaveForm.create(
            {
                user: userId,
                dateFrom: dateFrom,
                dateTo: dateTo,
                reasonForLeave,
                addressDuringLeave
            }
        );

        // return success response
        return NextResponse.json(
            {
                message: "leave form creation successfull",
                success: true,
                error: null,
                data: leaveForm
            }, {
            status: 200
        }
        );
    }

    // catch block 
    catch (err: any) {
        return NextResponse.json(
            {
                message: "problem in leave form creation controller",
                success: false,
                error: err.message,
                data: null
            },
            {
                status: 400
            }
        );
    }
}


export async function PUT(req: CustomNextRequest, res: NextResponse) {

    try {
        // verify gateKeeper is valid or not
        await middleware(req);

        const loggedInUserId = req.user;

        const loggedInUser = await User.findById(loggedInUserId);

        if (!loggedInUser || loggedInUser.role !== ROLE.Gatekeeper) {
            return NextResponse.json({
                message: "User not found or user is not authenticated",
                error: null,
                data: null,
                success: false,
            }, {
                status: 404
            });
        }

        // fetch data from body
        const body = await req.json();
        const { qrCodeString } = body;

        if (!qrCodeString) {
            return NextResponse.json({
                message: "No QR Code string received",
                error: null,
                data: null,
                success: false,
            }, {
                status: 400
            });
        }

        // split the data
        const formId = qrCodeString.split("-").at(0);
        const userId = qrCodeString.split("-").at(1);


        // Find the user and leave-form using the QR string
        const studentInfo = await Student.findById(userId);
        const formInfo = await LeaveForm.findById(formId);

        // Check if the user and leaveform exists
        if (!studentInfo || !formInfo) {

            return NextResponse.json({

                message: "User or leave-form not found",
                error: null,
                data: null,
                success: false,

            }, {
                status: 404,
            });
        }

        // if qrcode string not found
        if (!studentInfo.qrCode.qrString) {

            return NextResponse.json({
                message: "Qr String not found",
                error: null,
                data: null,
                success: false,

            }, {
                status: 404,
            });
        }

        // if user not scanned the qrcode till now  ------>> that means he/she try to out
        if (!studentInfo.qrCode.status) {

            const todaysDate = new Date();

            // if form date is not equal to today's date 
            if (!compareDates(formInfo.dateFrom, todaysDate)) {
                return NextResponse.json(
                    {
                        message: "You can't go today, Date doesn't matched",
                        error: null,
                        data: null,
                        success: false,
                    }, {
                    status: 401
                });
            }

            // Set the status of the student as "out"
            studentInfo.qrCode.status = true;
            formInfo.leavingTime = Date.now();

            // TODO: Send Mail to thier parents

        } else {
            // if user already scanned qrcode  --> that means he/she try to in

            // Make QR code setting as default
            studentInfo.qrCode.status = false;
            studentInfo.qrCode.qrString = "";
            // Update leave form data
            formInfo.leavingTime = Date.now();
            // TODO: Send mail to their parents
        }

        // Save the updated information
        await studentInfo.save();
        await formInfo.save();

        // Respond with success message
        return NextResponse.json(
            {
                message: studentInfo.qrCode.status ? "QR Scanned for Out successfully" : "QR Scanned for In successfully",
                error: null,
                data: null,
                success: true,
            }, {
            status: 200
        });

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            message: "An error occurred while processing the request",
            error: error.message,
            data: null,
            success: false,
        }, {
            status: 500,
        });
    }
}
