import express from 'express';
import dotenv from 'dotenv';
import recipeRoutes from "./routes/recipeRoutes";

import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());

app.use('/api', recipeRoutes);

app.listen(port, () => {
    console.log(`Running on ${port}`);
});
