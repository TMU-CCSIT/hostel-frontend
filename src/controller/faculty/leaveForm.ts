import LeaveForm from "@/models/form.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export const updateForm = async (req: NextRequest, res: NextResponse) => {
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

        if (result) form.status = form.status + 1;
        else form.status = -1;

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