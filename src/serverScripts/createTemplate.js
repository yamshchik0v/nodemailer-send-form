import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

const createTemplate = async (context) => {
   const source = fs.readFileSync(path.join(__dirname, '../mail-template/mail-template.handlebars'), 'utf8');
   const template = Handlebars.compile(source);
   return template({ context })
}

export default createTemplate