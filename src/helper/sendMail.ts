
import nodemailer from "nodemailer";

import User from "@/models/userModel";

import bcrypt from "bcrypt";

// import {connect} from "@/dbConfig/dbConfig";

import { dbConnection } from "@/app/config/dbConfig";



export const sendEmail = async(email:any,emailType:any,userId:any)=>{


    try{


        console.log("send email ke andar ",email,emailType,userId);

        // creatw the hashed token 

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType ==="VERIFY"){

            await User.findByIdAndUpdate(userId,{

                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now() + 3600000

            },{new :true});

        }

        if(emailType ==="RESET"){

            await User.findByIdAndUpdate(userId,{

                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now() + 3600000

            },{new :true});
            
        }

        console.log("mailer ke andar ");

        console.log(process.env.userMail,process.env.userPass);

        var transport = nodemailer.createTransport({
            host: process.env.mail_host,
            port:587,
            auth: {
              user:process.env.mail_user,
              pass:process.env.mail_pass

            }
        });



        const mailOptions = {

            from: process.env.mail_user,
            to: email, 
            subject: emailType ==="VERIFY" ? "verify your email" : " reset your password",
            html: `<p> Click <a href="${process.env.domain}/verifyEmail?token=${hashedToken}"here</a> to ${emailType ==="VERIFY" ? "verify your email" :"reset your password "}</p>`

        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    }catch(error:any){

        console.log(error);
        throw new Error(error.message);

    }
}




