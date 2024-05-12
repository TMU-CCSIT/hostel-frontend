import { dbConnection } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

import { middleware } from "@/middleware";
import User from "@/models/user.model";
import Student from "@/models/student.model";

dbConnection();

interface CustomNextRequest extends NextRequest {
    user: string,
}

export async function GET(req: CustomNextRequest, res: NextResponse) {

    try {

        await middleware(req);

        let userId = req.user;

        if (!userId) {

            return NextResponse
                .json(
                    {
                        message: "user id is not provided  ",
                        error: "",
                        data: null,
                        success: false,
                    },
                    {
                        status: 401
                    }
                );
        }


        const userDetails = await User.findById(userId)

        const student = await Student.findById(userDetails.refId);

        if (!student) {

            return NextResponse
                .json(
                    {
                        message: "no user found with id '" + userId,
                        error: "",
                        data: null,
                        success: false,
                    },
                    {
                        status: 404
                    }
                );
        }

        return NextResponse
            .json(
                {
                    message: "Sucessfully find user details  '" + userId,
                    error: "",
                    data: { student, user: userDetails },
                    success: true,
                },
                {
                    status: 200
                }
            );



    } catch (error: any) {


        console.log(error.message);

        return NextResponse
            .json(
                {
                    message: "some error occurred while fetching user details",
                    error: error.message,
                    data: null,
                    success: false,
                }, {
                status: 500
            });

    }
}






