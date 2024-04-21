import { ROLE, STATUS } from "@/constants/constant";
import LeaveForm, { IForm } from "@/models/form.model";
import User, { IUser } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


function queryByRole(user: IUser): string {

    let query = ``;

    switch (user.role) {
        case ROLE.Cordinator:
            query = 'leaveForm.student && leaveForm.student.course === "Btech"';
            break;
        case ROLE.Principal:
            query = '';
            break;
        default:
            query = ``;
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

        if (user.role === ROLE.Cordinator) {
            form.status.coordinator = result ? STATUS.ACCEPTED : STATUS.REJECTED;
        }
        else if (user.role === ROLE.Warden) {
            form.status.coordinator = result ? STATUS.ACCEPTED : STATUS.REJECTED;

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

        const body = await req.json();
        const { userId } = body;

        const user = await User.findById(userId);

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

        const allForms = await LeaveForm.find().populate("student").exec();

        const filteredLeaveForms = allForms.filter((leaveForm: IForm) => {
            return eval(query);
        });

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