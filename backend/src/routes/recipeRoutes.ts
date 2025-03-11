import { Router } from 'express';
import {getAvailableRecipes, getRecipeInfo} from "../controllers/recipeController";

const router = Router();

router.get('/recipes', async (req, res) => {
    const filter = req.query.filter?.toString() || '';
    const data = await getAvailableRecipes(filter);
    res.json(data);
})

router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const data = await getRecipeInfo(id);
    res.json(data);
});

export default router;