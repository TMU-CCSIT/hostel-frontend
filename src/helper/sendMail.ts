
import nodemailer from "nodemailer";

import bcrypt from "bcrypt";

import { dbConnection } from "@/config/dbConfig";

import User from "@/models/user.model";

import { v4 as uuidv4} from "uuid";



dbConnection();

export async function sendMail(email: string, emailType: string) {

  try {

    console.log("sendMail function called.");
    console.log("Email:", email);
    console.log("Email Type:", emailType);

    console.log("base url is ", process.env.NEXT_PUBLIC_BASE_URL);

    // Generate hashed token for the email

    // const hashedToken: string = await bcrypt.hash(email, 6);

    const hashedToken =  uuidv4().toString();

    console.log("Hashed Token:", hashedToken);


    // Update user's token and token expiry based on email type

    // Find a single user document based on the email address

    const updateUser = await User.findOneAndUpdate(


      { email: email },

      // Update object

      {
        token: hashedToken,
        tokenExpiry: new Date(Date.now() + 3600000), // tokenExpiry is set to expire in 1 hour
      },
      // Options
      { new: true }
    );


    // Create Nodemailer transport

    const transport = nodemailer.createTransport({
      host: process.env.mail_host,
      port: 587,
      auth: {
        user: process.env.mail_user,
        pass: process.env.mail_pass
      }
    });


    // Define email content
    const mailOptions = {
      from: process.env.mail_user,
      to: email,
      subject: emailType === "verifyEmail" ? "Verify Your Email" : "Reset Your Password",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${emailType === "verifyEmail" ? "Verify Your Email" : "Reset Your Password"}</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 2rem; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 2rem; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); }
                .header { text-align: center; margin-bottom: 2rem; }
                .header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
                .header p { font-size: 1.2rem; color: #777; }
                .content { text-align: center; }
                .content h2 { font-size: 1.5rem; margin-bottom: 1rem; }
                .content p { font-size: 1.1rem; color: #333; }
                .button-container { display: flex; justify-content: center; margin-top: 2rem; }
                .button { display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; }
                .button:hover { background-color: #45a049; }
            </style>
        </head>
        <body>
    
            <div class="container">
    
                <div class="header">
                    <h1>${emailType === "verifyEmail" ? "Verify Your Email" : "Reset Your Password"}</h1>
                    <p>${emailType === "verifyEmail" ? "Please click the button below to verify your email address." : "Please click the button below to reset your password."}</p>
                </div>
    
                <p>Click <a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/${emailType === "verifyEmail"?"verifyEmail":"forgotPassword"}/token=${hashedToken}">${emailType === "verifyEmail" ? "here" : "here"}</a> to ${emailType === "verifyEmail" ? "verify your email" : "reset your password"}</p> 

            </div>
    
        </body>
        </html>
      `
    };


    // Send email

    const mailResponse = await transport.sendMail(mailOptions);

    console.log("Mail Response:", mailResponse);

    return mailResponse;

  } catch (error: any) {

    console.error("Error sending email:", error.message);
    throw error;


  }
}





