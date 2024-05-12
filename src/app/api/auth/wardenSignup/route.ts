"use server"

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Warden from "@/models/warden.model";
import { createUserAndSetSession } from "@/action/userSignup";
// import { HOSTEL } from "@/constants/constant";
import { dbConnection } from "@/config/dbConfig";

dbConnection();

const wardenSchema = z.object({
  hostel: z.string(),
});

const HOSTEL = ["New Boys Hostel", "Mala Bhawan", "Gyan Bhawan", "Girls Hostel"]

async function wardenSignUp(warden: any) {

  try {




    const validatedWarden = wardenSchema.parse(warden);

    if (!HOSTEL.includes(validatedWarden.hostel)) {

      throw new Error("No hostel exists with the given name");

    }

    const { hostel } = warden;

    const newWarden = await Warden.create({

      hostel: hostel,

    });

    return newWarden;

  } catch (error: any) {

    console.log("warden error ");

    console.error('Error creating warden:', error.message);
    throw new Error("Error creating warden");
  }
}








export async function POST(req: NextRequest, res: NextResponse) {

  try {


    const body = await req.json();

    const { warden, user } = body;

    console.log(warden, user);

    if (!warden || !user) {

      return NextResponse.json(

        {

          success: false,
          error: "All fields are not fulfilled",
          message: "All fields are required",
          data: null,
        },
        { status: 400 }
      );
    }

    let newWarden;
    let newUser;

    try {

      newWarden = await wardenSignUp(warden);

      newUser = await createUserAndSetSession(user, "dkhd", newWarden?._id);


    } catch (error: any) {

      console.error('Error during signup:', error.message);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
          message: "Error occurred during signup",
          data: null,
        },
        { status: 500 }
      );

    }


    return NextResponse.json({

      success: true,
      error: null,
      message: "Warden signup done successfully",
      data: {

        newWarden,
        newUser

      },

    });



  } catch (error: any) {

    console.error('Error parsing request:', error.message);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Error occurred during request parsing",
        data: null,
      },
      { status: 400 }
    );
  }
}



