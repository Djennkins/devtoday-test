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