import express from 'express';
import path, { dirname } from 'path';
import sendEmail from './serverScripts/sendEmail.js';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads')
   },
   filename: function (req, file, cb) {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
   }
});


const upload = multer({
   storage: storage
}).single('image');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use('/scripts', express.static(__dirname + '/scripts/helpers'));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html')
});

app.post('/index', upload, (request, response) => {

   if (!request.body) return response.sendStatus(400);

   const userContext = {
      email: request.body.email,
      name: request.body.name,
      msg: request.body.message,
      sex: request.body.sex || 'not specified',
      age: request.body.age,
   }

   if (request.file) {
      userContext.img = request.file;
   }

   sendEmail(userContext);
   response.send(request.body)
});


app.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/index`));
