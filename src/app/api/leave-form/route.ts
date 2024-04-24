import { ROLE, STATUS } from "@/constants/constant";
import { middleware } from "@/middleware";
import LeaveForm from "@/models/form.model";
import Student from "@/models/student.model";
import User, { IUser } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import QRCode from 'qrcode';
import { z } from "zod";
import Coordinator from '../../../models/coordinator.model';


interface CustomNextRequest extends NextRequest {
    user: string,
}

const leaveFormSchema = z.object({
    dateFrom: z.date(),
    dateTo: z.date(),
    reasonForLeave: z.string(),
    addressDuringLeave: z.string(),
});



function queryByRole(user: IUser): string {

    let query = `leaveForm`;

    switch (user.role) {
        case ROLE.Coordinator:
            query = 'leaveForm.student && leaveForm.student.course === "Btech"';
            break;
        case ROLE.Principal:
            query = 'leaveForm';
            break;
        default:
            query = `leaveForm`;
    }
    return query;
}


const generateQRCode = async (data: string) => {
    try {

        return await QRCode.toString(data);

    } catch (error: any) {
        console.log("Error when generating qr code: ", error.message)
        throw new Error("QR generation failed!");
    }
}


export const PATCH = async (req: CustomNextRequest, res: NextResponse) => {
    try {

        await middleware(req);

        const body = await req.json();
        const { formId, result } = body;
        const userId = req.user;

        const form = await LeaveForm.findById(formId);

        const user = await User.findById(userId);

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

            console.log("coord")

            form.status.coordinator = result ? STATUS.Accepted : STATUS.Rejected;

        }


        // if hostel warden
        if (user.role === ROLE.Warden) {

            console.log("ward")
            // if result is true then set status and create qr code and put into user db
            if (result) {
                // set status
                form.status.hostelWarden = STATUS.Accepted;

                // create qr code
                const qrCodeString = await generateQRCode(`${formId}-${form.user}`);

                // user
                await Student.findOneAndUpdate(
                    { user: userId },
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

    } catch (error) {

        return NextResponse
            .json(
                {
                    message: "Server failed to update form, try again later",
                    error: error,
                    data: null,
                    success: false,
                },
                {
                    status: 500
                }
            );
    }
}



export const GET = async (req: NextRequest, res: NextResponse) => {
    try {

        // const { userId } = body;

        // const user = await User.findById(userId);

        // if (!user) {
        //     return NextResponse
        //         .json(
        //             {
        //                 message: "User not found",
        //                 error: "User not found",
        //                 data: null,
        //                 success: false,
        //             }, {
        //             status: 404
        //         });
        // }

        // const query = queryByRole(user);
        const query = `leaveForm`;

        const allForms = await LeaveForm.find().populate("user").exec();

        const filteredLeaveForms = allForms.filter((leaveForm: any) => {
            return eval(query);
        });

        return NextResponse
            .json(
                {
                    message: "Fetch all leave form successfully",
                    error: null,
                    data: filteredLeaveForms,
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


export async function POST(req: CustomNextRequest, res: NextResponse) {

    try {
        // initializing body
        const body = await req.json();

        await middleware(req);


        const userId = req.user;

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



