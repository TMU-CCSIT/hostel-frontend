import { NextRequest, NextResponse } from "next/server";

import Warden from "@/models/warden.model";


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        const { hostel } = body;

        if (!hostel) {
            return NextResponse.json(
                {
                    success: false,
                    error: null,
                    message: "Error occurred during signup",
                    data: null,
                },
                {
                    status: 500
                }
            );
        }

        // create a new hostel warden
        const newWarden = await Warden.create({
            hostel: hostel,
        });

        // successfully return the response
        return NextResponse.json({
            success: true,
            error: null,
            message: "Warden signup done successfully",
            data: newWarden,
        });

    } catch (error: any) {

        console.log(error.message);

        return NextResponse.json(
            {
                success: false,
                error: error.message,
                message: "Error occurred during signup",
                data: null,
            },
            {
                status: 500
            }
        );
    }
}




