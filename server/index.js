import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './Database/db.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.use('/Uploads',express.static('Uploads'));

import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  connectDb();
});