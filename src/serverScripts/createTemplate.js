import Handlebars from 'handlebars';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const createTemplate = async (context) => {
   const source = fs.readFileSync(path.join(__dirname, '../mail-template/mail-template.handlebars'), 'utf8');
   const template = Handlebars.compile(source);
   return template({ context })
}

export default createTemplate