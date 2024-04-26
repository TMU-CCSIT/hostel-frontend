import { z } from "zod";
import { dbConnection } from "@/config/dbConfig";
import { isEmailAlreadyExist } from "@/helper/isEmailExists";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import Student from "@/models/student.model";
import User from "@/models/user.model";
import { ROLE } from "@/constants/constant";
import { sendEmail } from "@/helper/sendMail";


// Establish database connection
dbConnection();

// Define user schema using zod
const userSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string(),
    contactNo: z.string(),
    address: z.string(),
    role: z.string(),
});

// Function to create user and set session
export async function createUserAndSetSession(user: any, session: any, roleId: string) {
    try {
        // Validate request body
        try {

            userSchema.parse(user);

        } catch (error: any) {

            // If validation fails, return error response

            return NextResponse.json({
                message: "Validation error",
                error: error.errors,
                data: null,
                success: false,
            }, {
                status: 401
            });
        }

        const { fullName, email, password, contactNo, address, role } = user;

        // Check if the user already exists
        const isUserExists = await isEmailAlreadyExist(email);
        if (isUserExists) {
            throw new Error("Email already registered, Please login to continue");
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        const imageUrl = `https://ui-avatars.com/api/?name=${fullName}`;

        // Create a new user
        const newUser = await User.create({


            fullName,
            email,
            contactNo,
            address,
            password: hashPassword,
            profileImage: imageUrl,
            isVerified: true,
            role: role,
            refId: roleId

        });

        // Save the user to the database
        const savedUser = await newUser.save({ session });

        // Send email verification (if required)
        // await sendEmail(email, "verify", newUser._id);

        // Successfully created user, return the user data
        return savedUser;

    } catch (error: any) {
        console.error('Error creating user:', error);
        throw error;
    }
}


