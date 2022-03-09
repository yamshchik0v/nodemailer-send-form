const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars')

async function sendEmail ( userContext){

   // creating transporter

   let transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
         user: 'email',
         pass: 'pass'
      }
   });

   // creating html with handlebars
   
   const source = fs.readFileSync(path.join(__dirname, './views/mail-template.handlebars'), 'utf8');
   const template = Handlebars.compile(source);


   // user's email
   let info = {
     from: '"Form" <sashayamschik0v@gmail.com>', 
     to: userContext.email, 
     subject: 'You have filled out the form!', 
     text: userContext.message,
     html: template({userContext})
   };

   // if we have a file in our userContext then we add an attachment to message
   if (userContext.img ){
      info.attachments = [
         {
            filename: userContext.img.filename,
            path: userContext.img.path
         }
      ]
   }

   return await transporter.sendMail(info, err => {
      err ? console.log(`Error:  ${err}`) :
            console.log('successfully sent!');

      fs.unlink(userContext.img.path, err => {
               err ? console.err(err) : console.log('deleted');
      })
   }) 
     
}

module.exports = sendEmail