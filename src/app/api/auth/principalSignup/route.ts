
import {z} from "zod";

import Principal from "@/models/principal.model";

import { COLLEGES } from "@/constants/constant";
import { NextResponse } from "next/server";

import { createUserAndSetSession } from "@/action/userSignup";

const principalSchema = z.object({

    
    college: z.string(),

})



async function principalSignUp(principal: any) {

    try {


        try {

            principalSchema.parse(principal);

        } catch (error: any) {

            console.log(error.message);

            throw new Error("validation error in coordinator");

        }


        const { college } = principal;


        const isCollege = COLLEGES.includes(college);


        if(!isCollege){

            
            throw new Error("college not found");
            
        }

        const newUser = await Principal.create({

            college:college,

        });

        // successfully return the resposne 

        return newUser;


    } catch (error: any) {


        console.log(error.message);

        throw new Error("some error occurred while creating a Coordinator")

    }
}






export async function POST (req: Request, res: Response){

    try{


        const body = await req.json();

        const {user,principal} = body ;

        const newPrincipal = await principalSignUp(principal);

        const newUser = await createUserAndSetSession(newPrincipal,"djd",newPrincipal._id);

        return NextResponse.json({

            message:"principal sign up successfully",

            data:{

                newUser,
                newPrincipal
            }
        },{

            status:200

        })


    }catch(error:any){

        console.log(error.message);

        return NextResponse.json({

            message:"error occurred in principal signup ",
            error:error.message

        },{

            status:500
        })
    }
}





