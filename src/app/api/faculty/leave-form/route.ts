import { ROLE, STATUS } from "@/constants/constant";
import LeaveForm from "@/models/form.model";
import User, { IUser } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";


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


export const PATCH = async (req: NextRequest, res: NextResponse) => {
    try {

        const body = await req.json();
        const { formId, result, userId } = body;

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

        if (user.role === ROLE.Coordinator) {
            form.status.coordinator = result ? STATUS.Accepted : STATUS.Rejected;
        }
        else if (user.role === ROLE.Warden) {
            form.status.coordinator = result ? STATUS.Accepted : STATUS.Rejected;

        } else {

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