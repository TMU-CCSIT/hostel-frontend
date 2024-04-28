import { NextRequest, NextResponse } from "next/server";

import Warden from "@/models/warden.model";

import {z} from "zod";

import { HOSTEL } from "@/constants/constant";
 
import {createUserAndSetSession} from "@/action/userSignup"


const wardenSchema = z.object({

    hostel:z.string(),

})

async function wardenSignUp(warden:any){

    try{

        try {

            wardenSchema.parse(warden);


        } catch (error: any) {

            // If validation fails, throw error
            console.error('Validation error:', error.errors);
            throw new Error('Validation error');

        }

        // fetch {the data from the body 

        const {hostel} = warden;

        const ishostelExists = HOSTEL.includes(hostel);

        if(!ishostelExists){

            // console.error('Error creating student:', error.message);

            throw new Error("no hostel exists with given hostel name ")
        }


        // create a new hostel warden 


        const newWarden = await Warden.create({

            hostel:hostel,

        })


        return newWarden;

    }catch(error:any){

        console.error('Error creating warden :', error.message);

        throw new Error("Error creating warden ",error.message);

    }

}




export async function POST(req: NextRequest, res: NextResponse) {


    try {


        const body = await req.json();

        const { warden,user } = body;

        if (!warden || !user) {
            
            return NextResponse.json(
                {
                    success: false,
                    error: null,
                    message: "all fields are not fullfilled ",
                    data: null,
                },
                {
                    status: 500
                }
            );
        }

        let newWarden;

        let newUser;

        try{

            newWarden = await wardenSignUp(Warden);

            newUser = await createUserAndSetSession(user,"dkhd",newWarden._id);


        }catch(error:any){


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





