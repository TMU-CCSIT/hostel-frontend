
import { z } from "zod";

import {} from "@/"

const signupSchema = z.object({

    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    course: z.string(),
    college: z.string(),
    fingerNumber: z.number(),
    rooomNumber: z.string(),
    fatherName: z.string(),
    address: z.string(),
    parentNumber: z.number(),

});


export async function Signup(req, res) {

    try {

        // fetch data 

        const body = await req.json();

        // Validate request body

        try {

            signupSchema.parse(body);

        } catch (error: any) {

            // If validation fails, return error response

            return res.status(400).json({

                message: "Validation error",
                success: false,
                error: error.errors,
                data: null

            });
        }


        const {

            fullName,
            email,
            password,
            course,
            college,
            fingerNumber,
            rooomNumber,
            fatherName,
            address,
            parentNumber

        } = body;


        // check the user is already exists 

        



    } catch (error) {


    }
}

