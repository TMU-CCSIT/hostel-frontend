
import { resend } from "@/config/resendConfig";

import VerificationEmail from "../../emails/verificationEmail";

import User from "@/models/user.model";

import bcrypt from "bcrypt";


export async function sendVerificationEmail(

    email: string,
    username: string,
    emailType: string,
    userId: string

) {

    try {

        // console

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        const updateUser = await User.findByIdAndUpdate(userId,{

            token:hashedToken,
            tokenExpiry:Date.now() + 3600000

        },{new:true})


        console.log("update user ",updateUser);


        await resend.emails.send({

            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: `${emailType === "reset" ? "Reset Password":" User Verification"}  Email Sent Successfully `,
            react: VerificationEmail({username,verificationLink:`http://localhost:3000/auth/verifyEmail/${hashedToken}`}),

        });


        return {

            success: true,
            message: "sucessfully send the email ",

        }


    } catch (error: any) {


        console.log(error.message);

        return {

            success: false,
            message: error.message,

        }

    }
}




