import { z } from "zod";
import Principal from "@/models/principal.model";
import { NextResponse } from "next/server";
import { createUserAndSetSession } from "@/action/userSignup";
import { COLLEGES } from "@/constants/constant";

const principalSchema = z.object({

  college: z.string(),

});


async function principalSignUp(principal: any) {

  try {

    // Validate the request body using Zod schema

    principalSchema.parse(principal);

    const { college } = principal;

    // Create a new principal in the database
    const newUser = await Principal.create({
      college,
    });

    // Successfully return the response
    return newUser;

  } catch (error: any) {

    console.log(error.message);
    throw new Error("Some error occurred while creating a principal");

  }
}

export async function POST(req: Request, res: Response) {

  try {

    const body = await req.json();

    const { user, principal } = body;

    // Validate the request body using Zod schema
    principalSchema.parse(principal);

    // Create a new principal in the database
    const newPrincipal = await principalSignUp(principal);

    // Create a new user and set the session
    const newUser = await createUserAndSetSession(user, "djd", newPrincipal._id);

    return NextResponse.json({
      message: "Principal sign up successfully",
      data: {
        newUser,
        newPrincipal,
      },
    }, {
      status: 200,
    });

  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({
      message: "Error occurred in principal signup",
      error: error.message,
    }, {
      status: 500,
    });
  }
}




