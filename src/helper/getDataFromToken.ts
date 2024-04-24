
import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";


export const getDataFromToken = async (req: NextRequest) => {

    try {

        const token = req.cookies.get('token')?.value || "";
        // for dummy
        const decodeToken: any = await jwt.decode(token);
        return decodeToken;
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}





