import { ROLE, STATUS } from "@/constants/constant";
import { middleware } from "@/middleware";
import LeaveForm from "@/models/form.model";
import User, { IUser } from "@/models/user.model";
import Coordinator, { ICoordinator } from "@/models/coordinator.model";
import Warden, { IWarden } from "@/models/warden.model";
import Student from "@/models/student.model";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { compareDates } from "@/helper/compareDates";

interface CustomNextRequest extends NextRequest {
    user: string;
}

const leaveFormSchema = z.object({
    dateFrom: z.date(),
    dateTo: z.date(),
    reasonForLeave: z.string(),
    addressDuringLeave: z.string(),
});

function isCoordinator(refId: any): refId is ICoordinator {
    return refId.branches !== undefined;
}

function isWarden(refId: any): refId is IWarden {
    return refId.hostel !== undefined;
}

async function getStudentQuery(user: IUser) {
    const allApplications = await LeaveForm.find({ user: user._id })
        .populate({
            path: "user",
            populate: { path: "refId", select: "enrollmentNo branch programe" },
            select: "fullName profileImage refId _id"
        })
        .exec();
    return allApplications;
}

async function getAdminQuery(user: IUser) {
    return 'leaveForm';
}

async function getCoordinatorQuery(user: IUser) {
    let allApplications;

    const populatedUser = await Coordinator.findById(user.refId);

    if (populatedUser && isCoordinator(populatedUser)) {
        allApplications = await LeaveForm.find()
            .populate({
                path: 'user',
                populate: {
                    path: 'refId',
                    // select: "enrollmentNo branch programe",
                    match: { programe: { $in: populatedUser.branches } },
                },
                select: "fullName profileImage refId _id"
            })
            .where("status.coordinator").equals(STATUS.Pending);
    } else {
        // Handle the case where user.refId is not a coordinator
    }

    return allApplications;
}

async function getWardenQuery(user: IUser) {

    const populatedUser = await Warden.findById(user.refId);

    if (populatedUser && isWarden(populatedUser)) {

        const allApplications = await LeaveForm.find({})
            .populate({
                path: 'user',
                populate: {
                    path: 'refId',
                    match: { hostel: { $eq: populatedUser.hostel } },
                },
                select: "fullName profileImage refId _id"
            })
            .where({
                $and: [
                    { "status.coordinator": STATUS.Accepted },
                    { "status.hostelWarden": STATUS.Pending }
                ]
            });

        console.log("All warden application ", allApplications);

        return allApplications;

    } else {
        return null;
    }
}



async function getPrincipalQuery(user: IUser) {
    const allApplications = await LeaveForm.find({ 'user.refId.college': "CCSIT" })
        .populate('user')
        .populate('user.refId')
        .exec();
    return allApplications;
}

async function getApplicationsByRole(user: IUser) {
    switch (user.role) {
        case ROLE.Coordinator:
            return await getCoordinatorQuery(user);
        case ROLE.Principal:
            return await getPrincipalQuery(user);
        case ROLE.Warden:
            return await getWardenQuery(user);
        case ROLE.Admin:
            return await getAdminQuery(user);
        case ROLE.Student:
            return await getStudentQuery(user);
        default:
            return [];
    }
}

export const GET = async (req: CustomNextRequest, res: NextResponse) => {
    try {
        await middleware(req);
        const userId = req.user;
        const user = await User.findById(userId).select("_id role refId");

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                error: "User not found",
                data: null,
                success: false,
            }, {
                status: 404
            });
        }

        const allForms = await getApplicationsByRole(user);

        return NextResponse.json({
            message: "Fetch all leave forms successfully",
            error: null,
            data: allForms,
            success: true,
        }, {
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            message: "Server failed to fetch all forms, try again later",
            error: error.message,
            data: null,
            success: false,
        }, {
            status: 500
        });
    }
};

export const PATCH = async (req: CustomNextRequest, res: NextResponse) => {
    try {
        await middleware(req);
        const body = await req.json();
        const { formId, result } = body;
        const userId = req.user;
        const form = await LeaveForm.findById(formId);
        const user = await User.findById(userId).populate("refId", "_id");

        if (!form || !user) {
            return NextResponse.json({
                message: "Form or user not found",
                error: "Form not found",
                data: null,
                success: false,
            }, {
                status: 404
            });
        }

        if (user.role !== ROLE.Coordinator && user.role !== ROLE.Warden) {
            return NextResponse.json({
                message: "User role is not authorized",
                error: "User role is not authorized",
                data: null,
                success: false,
            }, {
                status: 401
            });
        }

        if (user.role === ROLE.Coordinator) {
            form.status.coordinator = result ? STATUS.Accepted : STATUS.Rejected;
        }

        if (user.role === ROLE.Warden) {
            if (result) {
                form.status.hostelWarden = STATUS.Accepted;
                const uuid = uuidv4();
                const qrCodeString = `${formId}-${uuid}`;
                await Student.findByIdAndUpdate(
                    user.refId._id,
                    { $set: { "qrCode.qrString": qrCodeString } },
                    { new: true }
                );
            } else {
                form.status.hostelWarden = STATUS.Rejected;
            }
        }

        await form.save();

        return NextResponse.json({
            message: "Leave form updated successfully",
            error: null,
            data: null,
            success: true,
        }, {
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            message: "Server failed to update form, try again later",
            error: error.message,
            data: null,
            success: false,
        }, {
            status: 500
        });
    }
};

export async function POST(req: CustomNextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        await middleware(req);
        const userId = req.user;

        const userExist = await User.findById(userId);

        if (!userExist) {
            return NextResponse.json({
                message: "User does not exist",
                success: false,
                error: "User does not exist",
                data: null
            }, {
                status: 404
            });
        }

        const { dateFrom, dateTo, reasonForLeave, addressDuringLeave } = body;

        const leaveForm = await LeaveForm.create({
            user: userId,
            dateFrom,
            dateTo,
            reasonForLeave,
            addressDuringLeave
        });

        return NextResponse.json({
            message: "Leave form created successfully",
            success: true,
            error: null,
            data: leaveForm
        }, {
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            message: "Problem in leave form creation controller",
            success: false,
            error: error.message,
            data: null
        }, {
            status: 400
        });
    }
}

export async function PUT(req: CustomNextRequest, res: NextResponse) {
    try {
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

        const formId = qrCodeString.split("-")[0];
        const userId = qrCodeString.split("-")[1];

        const studentInfo = await Student.findById(userId);
        const formInfo = await LeaveForm.findById(formId);

        if (!studentInfo || !formInfo || !studentInfo.qrCode.qrString) {
            return NextResponse.json({
                message: "User or leave-form not found",
                error: null,
                data: null,
                success: false,
            }, {
                status: 404
            });
        }

        if (!studentInfo.qrCode.status) {
            const todaysDate = new Date();
            if (!compareDates(formInfo.dateFrom, todaysDate)) {
                return NextResponse.json({
                    message: "You can't go today, Date doesn't match",
                    error: null,
                    data: null,
                    success: false,
                }, {
                    status: 401
                });
            }
            studentInfo.qrCode.status = true;
            formInfo.leavingTime = Date.now();
        } else {
            studentInfo.qrCode.status = false;
            studentInfo.qrCode.qrString = "";
            formInfo.leavingTime = Date.now();
        }

        await studentInfo.save();
        await formInfo.save();

        const message = studentInfo.qrCode.status ? "QR Scanned for Out successfully" : "QR Scanned for In successfully";

        return NextResponse.json({
            message,
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
            status: 500
        });
    }
}