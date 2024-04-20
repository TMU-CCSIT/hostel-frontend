import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer for rendering React to HTML

import { EmailTemplate } from '@/helper/mailTemplates/verificationMailTemplate';
import { Resend } from 'resend';
import bcrypt from "bcrypt";
import User from '@/models/User.model';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(email: any, emailType: any, userId: any) {

  try {

    // Generate hashed token

    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Update user document with hashed token and token expiry

    await User.findByIdAndUpdate(userId, {

      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000

    }, { new: true });

    // Render React template to HTML
    
    const reactTemplate = EmailTemplate({

        emailType: emailType,
        hashedToken: hashedToken,
        
     });

    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(reactTemplate);

    // Send email using resend library
    const data = await resend.emails.send({

      from: process.env.NEXT_PUBLIC_SENDEREMAIL as string,
      to: email,
      subject: emailType === "verify" ? "Verify Your Email":" Reset Password",
      html: htmlTemplate, // Pass HTML template instead of react

    });

    return Response.json("done");
  } catch (error) {
    return Response.json({ error });
  }
}


