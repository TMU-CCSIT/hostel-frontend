import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "./helper/getDataFromToken";

interface CustomNextRequest extends NextRequest {
    user?: any;
}

export function middleware(req: CustomNextRequest) {

    const path = req.nextUrl.pathname;

    console.log("current path ",path);

    const isPublicPath = path === "auth/login" || path === "auth/signup" || path === "auth/verifyemail" || path === "/";

    let token = req.cookies.get("token")?.value || "";

    console.log("token ",token);

    
    if (token) {
        
        const userId = getDataFromToken(req);

        req.user = userId;

    }
    
    if (isPublicPath && token) {

        return NextResponse.redirect(new URL("/", req.nextUrl));

    }
    else {

        console.log("heloow");

        return NextResponse.redirect(new URL("/auth/signup", req.nextUrl));

    }


    return NextResponse.next();

}

export const config = {
    matcher: [
        "/",
        "/profile",
        "/login",
        "/signup",
        "/verifyemail",
    ],
};

