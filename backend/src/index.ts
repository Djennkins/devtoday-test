import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Work');
});

app.listen(port, () => {
    console.log(`Running on ${port}`);
});
