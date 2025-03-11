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
        const response = await axios.get(`${process.env.RECIPE_API_BASE_URL}/lookup.php?i=${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return { error: 'Failed to fetch recipe information' };
    }
};