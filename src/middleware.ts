import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "./helper/getDataFromToken";

interface CustomNextRequest extends NextRequest {
    user?: any;
}

const PublicPaths = ['/auth/login', '/auth/signup']

export async function middleware(req: CustomNextRequest) {

    const path = req.nextUrl.pathname;
    let isLoggedIn = req.cookies.get("token")?.value || "";

    if (isLoggedIn) {
        console.log("count")
        const decodedToken = await getDataFromToken(req);
        console.log("token : ", decodedToken)
        req.user = decodedToken.id;
    }

    const isPublicPath = PublicPaths.includes(path);

    if (isLoggedIn && isPublicPath) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!isLoggedIn && !isPublicPath) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};

