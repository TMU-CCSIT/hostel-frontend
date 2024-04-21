
import { NextRequest,NextResponse } from "next/server";

import jwt from "jsonwebtoken";


export const getDataFromToken = (req: NextRequest)=>{

    try{


        const token = req.cookies.get('token')?.value ||"";


        const decodeToken:any =  jwt.verify(token,process.env.token_secret!);

        console.log(decodeToken);

        return decodeToken.id;
         
    }
    catch(error:any){

        throw new Error(error.message);

    }
}


