import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "./helper/getDataFromToken";

interface CustomNextRequest extends NextRequest {
    user: {
        email: string,
        id: string,
        profileImage: string,
        fullName: string
    };
}

const PublicPaths = ['/auth/login', '/auth/signup']

export async function middleware(req: CustomNextRequest) {

    const path = req.nextUrl.pathname;
    let isLoggedIn = req.cookies.get("token")?.value || "";

    if (isLoggedIn) {
        const decodedToken = await getDataFromToken(req);
        console.log("token : ", decodedToken)
        req.user = decodedToken;
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

