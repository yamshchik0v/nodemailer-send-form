// express

const express = require('express');

// Node.js modules

const fs = require('fs')
const path = require('path');

// Importing nodemailer function

const sendEmail = require('./nodemailer');

// Multer  configuration 

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function ( req, file, cb ) {
      cb( null,  file.fieldname + '_' + Date.now() + path.extname(file.originalname) )
    }
});

const upload = multer( {
   storage: storage
 } ).single('image');

// Express server launcging

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html')
});


// Main functionality 

app.post('/index', upload, (request, response) => {
   
   if(!request.body) return response.sendStatus(400);

   
   const userContext = {
      email: request.body.email,
      name: request.body.name,
      nick: request.body.nickname,
      msg: request.body.message,
      sex: request.body.sex || 'not specified',
      age: request.body.age,
   }
   
   if (request.file) {
      userContext.img = request.file;
   }
   sendEmail( userContext );
   response.send(request.body)
});




app.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/index`));
