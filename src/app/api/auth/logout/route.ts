
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){

    try{

        let response = NextResponse.json({

            message:"logout sucessfull ",
            success: true,

        });


        response.cookies.set("token","",{

            httpOnly:true,
            expires:new Date(0)

        })

        return response;

    }

    catch(error:any){

        console.log(error.message);

        let response = NextResponse.json({

            message:"some error ocurres while logging out",
            error:error.message,
            success: 500,

        });

        return response;


    }
}




