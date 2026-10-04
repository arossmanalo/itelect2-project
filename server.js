import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing from .env');
  process.exit(1);
}

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});