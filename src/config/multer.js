import multer from "multer";
import dotenv from 'dotenv';

dotenv.config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.DRAW_PATH); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export default storage;