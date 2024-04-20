import LeaveForm from "@/models/form.model";
import Student from "@/models/Student.model";
import { NextRequest, NextResponse } from "next/server";


export const updateForm = async (req: NextRequest, res: NextResponse) => {
    try {

        const body = await req.json();
        const { formId, result, userId } = body;

        const form = await LeaveForm.findById(formId);
        const user = await Student.findById(userId);

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

        // pending

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