import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database.js';
import AuthRouter from './routes/auth.js';
import PostRouter from './routes/post.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
dotenv.config();
db();

const PORT = process.env.PORT || 5050;

app.use('/', AuthRouter)
app.use('/', PostRouter)

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})