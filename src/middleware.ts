import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "./helper/getDataFromToken";
import { ROLE } from "./constants/constant";

interface CustomNextRequest extends NextRequest {
    id: string,
}

const PublicPaths = ['/auth/login', '/auth/signup'];

export async function middleware(req: CustomNextRequest) {

    const path = req.nextUrl.pathname;

    let isLoggedIn = req.cookies.get("token")?.value || "";

    let decodedToken;

    if (isLoggedIn) {
        decodedToken = await getDataFromToken(req);
        req.id = decodedToken.id;
    }

    const isPublicPath = PublicPaths.includes(path);

    if (isLoggedIn && isPublicPath) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!isLoggedIn && !isPublicPath) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (isLoggedIn) {
        // If the user is logged in, check permission based on their role
        const hasPermission = checkPermission(decodedToken.role, path);
        if (!hasPermission) {

            return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirect to unauthorized page
        }
    }
    return NextResponse.next();
}

// Logic to check if the user has permission to access the given path based on their role
function checkPermission(role: ROLE, path: string): boolean {

    switch (role) {

        case "Student":
            return path.includes('student');
        case "Principal":
            return path.includes('principal');
        case "Coordinator":
            return path.includes('coordinator');
        default:
            return false;
    }
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};