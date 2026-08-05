import 'dotenv/config';
import express from 'express';
import router from './routes/index.js'; // Note the .js extension

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});