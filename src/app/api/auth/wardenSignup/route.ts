import { NextRequest, NextResponse } from "next/server";


import { z } from "zod";

import Warden from "@/models/warden.model";


// Define HOSTEL type explicitly

const HOSTEL = z.string();

const wardenSignupSchema = z.object({

    user: z.string(),
    hostel: z.string(),

});


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        try {
            wardenSignupSchema.parse(body);
        } catch (error: any) {
            console.log(error.message);
            return NextResponse.json({
                success: false,
                message: "Fields are not correct",
            }, { status: 400 });
        }

        const { user, hostel } = body;

        // create a new hostel warden
        const newWarden = await Warden.create({
            user: user,
            hostel: hostel,
        });

        // successfully return the response
        return NextResponse.json({
            success: true,
            message: "Warden signup done successfully",
            data: newWarden,
        });
    } catch (error: any) {

        console.log(error.message);

        return NextResponse.json({
            success: false,
            message: "Error occurred during signup",
        }, { status: 500 });
    }
}




