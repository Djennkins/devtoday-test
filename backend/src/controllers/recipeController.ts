import axios from 'axios';

export const getAvailableRecipes = async (filterBy: string = '', filterValue: string = '') => {
    try {
        console.log('filterBy', filterBy, 'filterValue', filterValue);
        if (filterBy !== '' && filterValue !== '') {
            const response = await axios.get(`${process.env.RECIPE_API_BASE_URL}/filter.php?${filterBy}=${filterValue}`);
            return response.data;
        }
        const response = await axios.get(`${process.env.RECIPE_API_BASE_URL}/search.php?s=`);
        return response.data
    } catch (error) {
        console.error(error);
        return { error: 'Failed to fetch recipes' };
    }
};

export const getRecipeInfo = async (id: string) => {
    try {
        const responseRecipe = await axios.get(`${process.env.RECIPE_API_BASE_URL}/lookup.php?i=${id}`);
        const recipe = responseRecipe.data.meals[0];
        const responseRecipesFromCategory = await axios.get(`${process.env.RECIPE_API_BASE_URL}/filter.php?c=${recipe.strCategory}`);
        const recipesFromCategory = responseRecipesFromCategory.data.meals;

        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() && measure) {
                ingredients.push({ ingredient, measure });
            }
        }

        return  {recipe: {
                idMeal: recipe.idMeal,
                strMeal: recipe.strMeal,
                strCategory: recipe.strCategory,
                strArea: recipe.strArea,
                strInstructions: recipe.strInstructions,
                strMealThumb: recipe.strMealThumb,
                strTags: recipe.strTags,
                strYoutube: recipe.strYoutube,
                ingredients,
                strImageSource: recipe.strImageSource,
            },
            recipesFromCategory
        };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to fetch recipe information' };
    }
};