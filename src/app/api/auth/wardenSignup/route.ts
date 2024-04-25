
import Warden from "@/models/warden.model";

import { z } from "zod";

import { IUser } from "@/models/user.model";

import { NextRequest, NextResponse } from "next/server";



const wardenSignupSchema = z.object({

    user: z.string(),
    programe: z.string(),

})



export async function POST(req: NextRequest, res: NextResponse) {

    try {

        const body = await req.json();

        try {

            wardenSignupSchema.parse(body);


        } catch (error: any) {

            console.log(error.message);

            return NextResponse.json({


                success: false,
                message: "fileds are not correct "

            },
                { status: 400 }
            )


        }



        const {user,programe} = body ;


        // create a new hostel warden 

        const newWarden = await Warden.create({

            user:user,
            programe:programe

        })

        // successfully retur the reponse 


        return NextResponse.json({

            success:false,
            message:"warden sigup done successfully",
            data:newWarden

        })


    }
    catch (error: any) {


        console.log(error.message);

        return NextResponse.json({

            success:false,
            message:"error occur during signup "

        },{

            status:500
        })


    }
}




















