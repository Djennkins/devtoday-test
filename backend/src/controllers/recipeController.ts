import axios from 'axios';

export const getAvailableRecipes = async (filter: string = '') => {
    try {
        const response = await axios.get(`${process.env.RECIPE_API_BASE_URL}/search.php?s=${filter}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return { error: 'Failed to fetch recipes' };
    }
};