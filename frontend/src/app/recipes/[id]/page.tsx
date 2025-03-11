'use client'

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import axios from "axios";
import {RecipeInterface, RecipeListItem} from "../../../types/recipe";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

const RecipeDetail = () => {
    const {id} = useParams<{ id: string }>()
    const [recipe, setRecipe] = useState<RecipeInterface | null>(null);
    const [recipesFromCategory, setRecipesFromCategory] = useState<RecipeListItem[] | null>(null);

    useEffect(() => {
        if (id) {
            const fetchRecipe = async () => {
                console.log("fetchRecipe id", id);
                try {
                    const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
                    setRecipe(response.data.recipe);
                    setRecipesFromCategory(response.data.recipesFromCategory);
                } catch (error) {
                    console.error("Error fetching recipe:", error);
                }
            };

            fetchRecipe();
        }
    }, [id]);

    if (!recipe || !recipesFromCategory) return <p>Loading...</p>;

    return (
        <div className="flex gap-24 justify-between p-20 m-auto h-dvh">
            <div className="flex gap-8 max-w-[70%]">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-96 h-96 object-cover rounded-md mb-4"
                />
                <div className="flex flex-col gap-2">
                    <h1 className='text-xl font-bold text-center'>{recipe.strMeal}</h1>
                    <div>Area: <Link href={`/?a=${recipe.strArea}`} className='underline'>{recipe.strArea}</Link></div>
                    <div dangerouslySetInnerHTML={{__html: recipe.strInstructions.replace(/\r\n/g, '<br />')}}/>
                    <div>
                        <h2>Ingredients:</h2>
                        <ul>
                            {recipe.ingredients.map((ingredientItem) => (
                                <li>
                                    <Link href={`/?i=${ingredientItem.ingredient}`}>
                                        {ingredientItem.ingredient}
                                    </Link> - {ingredientItem.measure}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        Category: <Link href={`/?c=${recipe.strCategory}`}
                                        className='underline'>{recipe.strCategory}</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 max-w-[20%] ">
                <h1 className='text-xl font-bold text-center'>
                    Recipes From The Same Category:
                </h1>
                <div className={'flex flex-col gap-2 h-[100%] overflow-y-auto'}>

                    <div className={'grid grid-cols-1 gap-4'}>
                        {recipesFromCategory.map((recipeInfo) => (
                            <Card key={recipeInfo.idMeal}>
                                <CardHeader>
                                    <CardTitle>{recipeInfo.strMeal}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={recipeInfo.strMealThumb}
                                        alt={recipeInfo.strMeal}
                                        className="w-full h-64 object-cover rounded-md mb-4"
                                    />
                                    <Button>
                                        <Link href={`/recipes/${recipeInfo.idMeal}`}>
                                            Get Recipe
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
