import multer from 'multer';
import crypto from 'crypto';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const extFile = file.originalname.split('.')[1];
		const newFileName = crypto.randomBytes(32).toString('hex');

		cb(null, `${newFileName}.${extFile}`);
	}
});

const upload = multer({ storage });

export { upload };
