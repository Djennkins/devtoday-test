import { Router } from 'express';
import {getAvailableRecipes, getRecipeInfo} from "../controllers/recipeController";

const router = Router();

router.get('/recipes', async (req, res) => {
    const filterBy = req.query.filterBy?.toString() || '';
    const filterValue = req.query.filterValue?.toString() || '';
    const data = await getAvailableRecipes(filterBy, filterValue);
    res.json(data);
})

router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const data = await getRecipeInfo(id);
    res.json(data);
});

export default router;