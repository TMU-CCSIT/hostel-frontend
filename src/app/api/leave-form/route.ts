import { ROLE, STATUS } from "@/constants/constant";
import { middleware } from "@/middleware";
import LeaveForm from "@/models/form.model";
import Student from "@/models/student.model";
import User, { IUser } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import QRCode from 'qrcode';
import { z } from "zod";


interface CustomNextRequest extends NextRequest {
    user: string,
}

const leaveFormSchema = z.object({
    dateFrom: z.date(),
    dateTo: z.date(),
    reasonForLeave: z.string(),
    addressDuringLeave: z.string(),
});


function getStudentQuery(user: IUser): string {

    const query = 'leaveForm.user===user._id';
    return query;
}
function getAdminQuery(user: IUser): string {
    return 'leaveForm'
}

function getCoordinatorQuery(user: IUser): string {
    const query = 'leaveForm ';
    // query = 'user.refId.program===leaveForm.user.program';
    return query;
}


function getWardenQuery(user: IUser): string {
    // const query = 'user.refId.hostel===leaveForm.user.hostel';
    const query = 'leaveForm';
    return query;
}

function getPrincipalQuery(user: IUser): string {
    const query = 'user.refId.college===leaveForm.user.college';
    return query;
}



function queryByRole(user: IUser): string {

    let query = "";

    switch (user.role) {
        case ROLE.Coordinator:
            query = getCoordinatorQuery(user)
            break;
        case ROLE.Principal:
            query = getPrincipalQuery(user)
            break;
        case ROLE.Warden:
            query = getWardenQuery(user)
            break;
        case ROLE.Admin:
            query = getAdminQuery(user)
            break;
        case ROLE.Student:
            query = getStudentQuery(user)
            break;
        default:
            query = `leaveForm`;
    }
    return query;
}



const generateQRCode = async (data: string) => {
    try {

        return await QRCode.toDataURL(data);

    } catch (error: any) {
        console.log("Error when generating qr code: ", error.message)
        throw new Error("QR generation failed!");
    }
}


export const GET = async (req: CustomNextRequest, res: NextResponse) => {
    try {


        await middleware(req);

        const userId = req.user;

        //  TODO: populate the refId
        // const user = await User.findById(userId).populate("refId").exec();
        const user = await User.findById(userId);

        console.log(user)

        // don't need this one
        if (!user) {
            return NextResponse
                .json(
                    {
                        message: "User not found",
                        error: "User not found",
                        data: null,
                        success: false,
                    }, {
                    status: 404
                });
        }

        const query = queryByRole(user);

        // populate all forms
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

            form.status.coordinator = result ? STATUS.Accepted : STATUS.Rejected;

        }


        // if hostel warden
        if (user.role === ROLE.Warden) {
            // if result is true then set status and create qr code and put into user db
            if (result) {
                // set status
                form.status.hostelWarden = STATUS.Accepted;

                // create qr code
                const qrCodeString: string = await generateQRCode(`${formId}-${form.user}`);
                // user

                const user = await User.findById(form.user);

                await Student.findByIdAndUpdate(
                    user.refId,
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


export async function PUT(req: NextRequest, res: NextResponse) {

    try {

        let body = await req.json();
        const { qrString } = body;

        if (!qrString) {

            return NextResponse.json({

                message: "No QR string received",
                error: null,
                data: null,
                success: false,
            }, {
                status: 400
            });
        }

        const { leaveformId, userId } = qrString;

        // Find the user using the QR string

        const userInfo = await Student.findOne({ user: userId });

        // Check if the user exists

        if (!userInfo) {

            return NextResponse.json({

                message: "User not found",
                error: null,
                data: null,
                success: false,

            }, {
                status: 404,
            });
        }

        // Check if the user is already scanned

        if (userInfo.qrCode.status === false) {

            const today = new Date();

            const userLeaveFormData = await LeaveForm.findOne({
                user: userInfo.user,
                dateFrom: today,
            });

            if (!userLeaveFormData) {

                return NextResponse.json({

                    message: "The leaving date in the form does not match the current date",
                    error: null,
                    data: null,
                    success: false,
                }, {
                    status: 400,
                });
            }

            // Set the status of the student as "out"

            userInfo.qrCode.status = true;

        } else {

            // Set the student status as "false"

            userInfo.qrCode.status = false;

            userInfo.qrCode.qrString = null; // Make QR code string null

            // Update leave form data
            const updateLeaveFormData = await LeaveForm.findByIdAndUpdate(leaveformId, {

                arrivingDate: new Date(),

            });

            // Sending confirmation mail to the parents regarding the reaching of their child
        }

        // Save the updated user information

        await userInfo.save();

        // Respond with success message

        return NextResponse.json({

            message: "QR code status updated successfully",
            error: null,
            data: null,
            success: true,
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

