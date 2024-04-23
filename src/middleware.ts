import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "./helper/getDataFromToken";

import { ROLE } from "./constants/constant";

interface CustomNextRequest extends NextRequest {
    user: {

        id: string,
    };
}

const PublicPaths = ['/auth/login', '/auth/signup']

export async function middleware(req: CustomNextRequest) {

    const path = req.nextUrl.pathname;

    console.log("path is ",path);

    let isLoggedIn = req.cookies.get("token")?.value || "";

    console.log("token value ",isLoggedIn);

    let decodedToken;

    if (isLoggedIn) {

        decodedToken = await getDataFromToken(req);
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

    console.log("path is ",path);

    if (isLoggedIn) {

        console.log(decodedToken.role);


        // If the user is logged in, check permission based on their role
        const hasPermission = checkPermission(decodedToken.role, path);

        console.log(hasPermission)

        if (!hasPermission) {

            return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirect to unauthorized page
        }
        // else{

        //     return NextResponse.redirect(new URL(`http://localhost:3000/${path}`, req.url));
        // }


    }

    return NextResponse.next();

}


function checkPermission(role: ROLE, path: string): boolean {

    // Logic to check if the user has permission to access the given path based on their role

    console.log(role,path);

    switch (role) {

        case "Student":
            // Allow access to student-specific paths
            return path.includes('Student');

        case "Principal":
            // Allow access to principal-specific paths
            return path.includes('/Principal/');
        case "Coordinator":
            // Allow access to coordinator-specific paths
            return path.includes('/Coordinator/');

        default:
            // For other roles or unknown roles, deny access
            return false;
    }
}


export const config = {

    matcher: '/((?!api|static|.*\\..*|_next).*)',

};

