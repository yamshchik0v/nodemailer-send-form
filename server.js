const express = require('express');
const { request } = require('http');
const sendMail = require('./nodemailer');
const multer = require('multer');

const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function ( req, file, cb ) {
      cb( null, file.fieldname + '_' + Date.now() + path.extname(file.originalname) )
    }
});

const upload = multer( { storage: storage } );

const bodyParser = require('body-parser');
const exp = require('constants');
const req = require('express/lib/request');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));


app.post('/index', upload.single('image'), (request, response) => {
   
   if(!request.body) return response.sendStatus(400);

   const message = {
      to: request.body.email,
      subject: 'Your message has been sent',
      nickname: request.body.nickname,
      text: `Congratulations, ${request.body.name}, your message have been successfuly sent`,
      sex: request.body.sex,
      message: request.body.message,
      email: request.body.email,
      image: request.body.image
   }
  //  console.log('incoming data: ', message);
  console.log(request.body) 
   response.send(request.body);
    

});

app.get('/index', (request, response) => {
   response.sendFile(__dirname + '/index.html')
});


app.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/index`));
