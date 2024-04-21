import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "./helper/getDataFromToken";

interface CustomNextRequest extends NextRequest {
    user?: any;
}

export function middleware(req: CustomNextRequest) {
    const path = req.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup" || path === "verifyemail";

    let token = req.cookies.get("token")?.value || "";

    if (isPublicPath && token) {

        return NextResponse.redirect(new URL("/", req.nextUrl));

    }
    else {

        return NextResponse.redirect(new URL("/signup", req.nextUrl));
    }

    const userId = getDataFromToken(req);

    if (userId) {

        req.user = userId;

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

