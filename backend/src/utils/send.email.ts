import { transporter } from "../config/mailer";

export interface ISendEMAIL {
    email: string,
    subject: string,
    text: string,
    html: string
}


export const sendEmail = async ( emailObj : ISendEMAIL)=>{
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailObj.email,
      subject: emailObj.subject,
      text: emailObj.text,
      html: emailObj.html,
    });
}



