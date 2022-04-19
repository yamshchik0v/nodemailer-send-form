import 'dotenv/config';
import nodemailer from 'nodemailer';
import fs from 'fs';
import createTemplate from './createTemplate.js';

async function sendEmail(context) {

   const transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
         user: process.env.EMAIL,
         pass: process.env.PASS
      }
   });

   const info = {
      from: 'mail@gmail.com',
      to: context.email,
      subject: 'You have filled out the form!',
      text: context.message,
      html: await createTemplate(context)
   };

   if (context.img) {
      info.attachments = [
         {
            filename: context.img.filename,
            path: context.img.path
         }
      ]
   }

   return await transporter.sendMail(info, err => {
      err
         ? console.error(err)
         : console.log('Mail successfully sent!');
      if (info.attachments) {
         fs.unlink(context.img.path, err => {
            err
               ? console.error(err)
               : console.log('Deleted attachment from ');
         })
      }
   })

}

export default sendEmail