import express from 'express';
import dotenv from 'dotenv';
import recipeRoutes from "./routes/recipeRoutes";

dotenv.config();

const app = express();
const port = 5000;

app.use('/api', recipeRoutes);

app.listen(port, () => {
    // console.log(process.env.RECIPE_API_BASE_URL);
    console.log(`Running on ${port}`);
});
