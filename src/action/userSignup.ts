"use server";

import { z } from "zod";
import { dbConnection } from "@/config/dbConfig";
import { isEmailAlreadyExist } from "@/helper/isEmailExists";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { sendMail } from "@/helper/sendMail";
import mongoose from "mongoose";



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
export async function createUserAndSetSession(user: any, session: any, roleId: any) {

    try {

        // Validate request body

        try {

            userSchema.parse(user);

        } catch (error: any) {

            // If validation fails, return error response

            return NextResponse.json({
                message: "Validation error in user ",
                error: error.errors,
                data: null,
                success: false,
            }, {
                status: 401
            });
        }

        if (!roleId) {

            throw new Error("role id is not provided");

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
        const newUser: any = await User.create({
            fullName,
            email,
            contactNo,
            address,
            password: hashPassword,
            profileImage: imageUrl,
            role: role,

            // isVerified:true,

            refId: new mongoose.Types.ObjectId(roleId)

        });

        // Save the user to the database
        // const savedUser = await newUser.save({ session });

        // console.log(await sendVerificationEmail(email,fullName,"verify",newUser._id,))

        sendMail(email, "verifyEmail");


        return newUser;

    } catch (error: any) {

        console.error('Error creating user:', error);
        throw error;

    }
}


export async function fetchUserDetails(userId: string) {

    try {

        if (!userId) {
            throw new Error("User id is not provided");
        }


        const userDetails = await User.findById(userId)

        if (!userDetails) {

            throw new Error("User not found");
        }

        return userDetails;


    } catch (error: any) {


        console.log(error.message);

        throw new Error("some error occurred while fetching user details")

    }
}









