export default (file, callback) => {
   const allowedFileTypes = /jpg$|jpeg$|png$|gif$/i;
   const extnameValid = allowedFileTypes.test(file.originalname);
   const mimetypeValid = allowedFileTypes.test(file.mimetype);
   if (extnameValid && mimetypeValid) {
      return callback(null, true);
   } else return callback(null, false)
}
