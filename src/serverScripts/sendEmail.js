import nodemailer from 'nodemailer';
import fs from 'fs';
import createTemplate from './createTemplate.js';

async function sendEmail(context) {

   const transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
         user: 'sashayamschik0v@gmail.com',
         pass: 'Where4R3W3.'
      }
   });

   const info = {
      from: 'sashayamschik0v@gmail.com',
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
         : console.log('Successfully sent!');

      fs.unlink(context.img.path, err => {
         err
            ? console.error(err)
            : console.log('Deleted');
      })
   })

}

export default sendEmail