import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

app.listen(process.env.PORT, () => {
	console.log(`Server is running on PORT ${process.env.PORT}`);
});