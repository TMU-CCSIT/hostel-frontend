
import { EmailTemplate } from '@/helper/mailTemplates/verificationMailTemplate';

import { Resend } from 'resend';

import bcrypt from "bcrypt";

import User from '@/models/User.model';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendEmail(email:any,emailType:any,userId:any) {
    
  try {

    const hashedToken = await bcrypt.hash(userId.toString(), 10);


    await User.findByIdAndUpdate(userId,{

        verifyToken:hashedToken,
        verifyTokenExpiry:Date.now() + 3600000

    },{new :true});



    // const data = await resend.emails.send({

    //   from: 'Acme <onboarding@resend.dev>',
    //   to: ['delivered@resend.dev'],
    //   subject: 'Hello world',
    //   react: EmailTemplate({ firstName: 'John' }),

    // });

    return Response.json("done");
  } catch (error) {
    return Response.json({ error });
  }
}


