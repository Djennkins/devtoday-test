export interface RecipeInterface  {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    ingredients: IngredientInterface[];
    strImageSource: string;
}

export interface IngredientInterface {
    ingredient: string;
    measure: string;
}

export interface RecipeListItem {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}