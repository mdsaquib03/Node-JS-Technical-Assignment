import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadPath = path.join(__dirname, '../', 'uploads');

try {
    fs.mkdirSync(uploadPath, { recursive: true });
} catch (error) {
    console.log(`Error creating uploads directory: ${error}`);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, uploadPath);
    },
    filename: function (request, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

export default upload;