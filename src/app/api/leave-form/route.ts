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
import Warden, { IWarden } from "@/models/warden.model";
import Coordinator, { ICoordinator } from "@/models/coordinator.model";
import { IPrincipal } from "@/models/principal.model";

=======
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

// It will check user is valid coordinator or not || Validation
function isCoordinator(refId: IStudent | IWarden | ICoordinator | IPrincipal): refId is ICoordinator {
    return (refId as ICoordinator).branches !== undefined;
}

// It will check user is valid principal or not || Validation
function isPrincipal(refId: IStudent | IWarden | ICoordinator | IPrincipal): refId is ICoordinator {
    return (refId as IPrincipal).college !== undefined;
}


// It will check user is valid warden or not || Validation
function isWarden(refId: IStudent | IWarden | ICoordinator | IPrincipal): refId is IWarden {
    return (refId as IWarden).hostel !== undefined;
}


// For student
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


// For admin
async function getAdminQuery(user: IUser) {
    return 'leaveForm';
}

<<<<<<< HEAD

// For coordinator
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
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
            .where("status.coordinator").equals(STATUS.Pending);
    } else {
    // Handle the case where user.refId is not a coordinator
}

return allApplications;
}

<<<<<<< HEAD

// For warden
=======
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
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
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
                .where({
                    $and: [
                        { "status.coordinator": STATUS.Accepted },
                        { "status.hostelWarden": STATUS.Pending }
                    ]
                });

            console.log("All warden application ", allApplications);

            return allApplications;

>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
        } else {
            return null;
        }
    }

<<<<<<< HEAD
    // For principal
=======


>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
    async function getPrincipalQuery(user: IUser) {
        const allApplications = await LeaveForm.find({ 'user.refId.college': "CCSIT" })
            .populate('user')
            .populate('user.refId')
            .exec();
        return allApplications;
    }

<<<<<<< HEAD

    // Fetch leaves by their role
=======
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
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

<<<<<<< HEAD

    // To Get leave-Form
    export const GET = async (req: CustomNextRequest, res: NextResponse) => {
        try {

=======
export const GET = async (req: CustomNextRequest, res: NextResponse) => {
    try {
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
            await middleware(req);
            const userId = req.user;
            const user = await User.findById(userId).select("_id role refId");

<<<<<<< HEAD
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

=======
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
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
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
<<<<<<< HEAD
    }


    // To update status of leaveform by college & hostel
=======
};

>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
    export const PATCH = async (req: CustomNextRequest, res: NextResponse) => {
        try {
            await middleware(req);
            const body = await req.json();
            const { formId, result } = body;
            const userId = req.user;
<<<<<<< HEAD

            const form = await LeaveForm.findById(formId);

=======
        const form = await LeaveForm.findById(formId);
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
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
<<<<<<< HEAD

                    // create qr code
                    const qrCodeString: string = `${formId}-${uuid}`;

=======
                const qrCodeString = `${formId}-${uuid}`;
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
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
<<<<<<< HEAD
    }

    // To create new leave form in database
=======
};

>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
    export async function POST(req: CustomNextRequest, res: NextResponse) {
        try {
            const body = await req.json();
            await middleware(req);
            const userId = req.user;

<<<<<<< HEAD
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
=======
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
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
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

<<<<<<< HEAD
    //  To In/Out functionality
=======
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
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

<<<<<<< HEAD
            // split the data
            const formId = qrCodeString.split("-").at(0);
            const userId = qrCodeString.split("-").at(1);
=======
        const formId = qrCodeString.split("-")[0];
        const userId = qrCodeString.split("-")[1];
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da

            const studentInfo = await Student.findById(userId);
            const formInfo = await LeaveForm.findById(formId);

<<<<<<< HEAD
            // Find the user and leave-form using the QR string
            const studentInfo = await Student.findById(userId);
            const formInfo = await LeaveForm.findById(formId);

            // Check if the user and leaveform exists
            if (!studentInfo || !formInfo) {

                return NextResponse.json({

=======
        if (!studentInfo || !formInfo || !studentInfo.qrCode.qrString) {
            return NextResponse.json({
>>>>>>> 4f772158984bf8425b85e182ad809abb6cb8f6da
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
}
