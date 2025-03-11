import { Router } from 'express';
import {getAvailableRecipes} from "../controllers/recipeController";

const router = Router();

router.get('/recipes', async (req, res) => {
    const filter = req.query.filter?.toString() || '';
    const data = await getAvailableRecipes(filter);
    res.json(data);
})

export default router;