import { ROLE, STATUS } from "@/constants/constant";
import { middleware } from "@/middleware";
import LeaveForm from "@/models/form.model";
import Student from "@/models/student.model";
import User, { IUser } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
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


async function getStudentQuery(user: IUser) {

    const allApplications = await LeaveForm.find({ user: user._id });

    return allApplications;
}

async function getAdminQuery(user: IUser) {
    return 'leaveForm'
}

async function getCoordinatorQuery(user: IUser) {

    console.log("coord: ", user)

    const allApplications = await LeaveForm.find({
        'user.refId.programe': { $in: ['Btech', 'Ai'] }
    })
        .populate('user')
        .populate('user.refId')
        .exec();

    return allApplications;
}


async function getWardenQuery(user: IUser) {
    console.log("warden: ", user)

    const allApplications = await LeaveForm.find({
        'user.refId.hostel': { $eq: "New Boys Hostel" }
    })
        .populate('user')
        .populate('user.refId')
        .exec();

    return allApplications;
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
            .select("_id role")
            .populate("refId", "-qrCode"
                .exec();

        console.log("user: ", user)

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


        const allForms = await getApplicationsByRole(user);

        return NextResponse
            .json(
                {
                    message: "Fetch all leave form successfully",
                    error: null,
                    data: allForms,
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
                const qrCodeString: string = `${formId}-${form.user}`;

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


export async function PUT(req: CustomNextRequest, res: NextResponse) {

    try {

        // verify gateKeeper is valid or not
        await middleware(req);

        const loggedInUserId = req.user;

        const loggedInUser = await User.findById(loggedInUserId);

        console.log("loggedInUser: ", loggedInUser);

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
        const studentInfo = await Student.findOne({ user: userId });
        const formInfo = await LeaveForm.findById(formId);

        console.log("userInfo: ", studentInfo)
        console.log("formInfo: ", formInfo)

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

        // if user not scanned the qrcode till now  ------>> that means he/she try to out
        if (!studentInfo.qrCode.status) {

            const todaysDate = new Date();

            // if date doesn't match
            if (formInfo.dateFrom !== todaysDate) {
                return NextResponse.json(
                    {
                        message: "You can't go today, Date is not matched",
                        error: null,
                        data: null,
                        success: false,
                    }, {
                    status: 400
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
            studentInfo.qrCode.qrString = null;

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
                message: "QR code status updated successfully",
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

