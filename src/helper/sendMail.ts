
import { EmailTemplate } from '@/helper/mailTemplates/verificationMailTemplate';
import { Resend } from 'resend';
import bcrypt from "bcrypt";

import Student from '@/models/Student.model';

import { renderReactToStaticMarkup } from './renderToStaticMarkup';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(email: any, emailType: any, userId: any) {

  try {

    console.log("send email ke andar ",process.env.NEXT_PUBLIC_RESEND_API_KEY);

    // Generate hashed token

    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Update user document with hashed token and token expiry

    await Student.findByIdAndUpdate(userId, {

      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000

    }, { new: true });

    // Render React template to HTML

    const reactTemplate = EmailTemplate({

      emailType: emailType,
      hashedToken: hashedToken,

    });

    // const htmlTemplate = ReactDOMServer.renderToStaticMarkup(reactTemplate);

    // const htmlTemplate = renderReactToStaticMarkup(reactTemplate);

    // Send email using resend library
    const data = await resend.emails.send({

      from: process.env.NEXT_PUBLIC_SENDEREMAIL as string,
      to: email,
      subject: emailType === "verify" ? "Verify Your Email" : " Reset Password",
      html: "<h1>hellow</h1>", // Pass HTML template instead of react

    });

    console.log("mail data is ",data);

    return Response.json("done");

  } catch (error) {

    return Response.json({ error });

  }
}


