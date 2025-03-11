'use client'

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import axios from "axios";
import {RecipeInterface} from "../../../types/recipe";
import Link from "next/link";

const RecipeDetail = () => {
    const {id} = useParams<{ id: string }>()
    const [recipe, setRecipe] = useState<RecipeInterface | null>(null);

    useEffect(() => {
        if (id) {
            const fetchRecipe = async () => {
                console.log("fetchRecipe id", id);
                try {
                    const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
                    setRecipe(response.data);
                } catch (error) {
                    console.error("Error fetching recipe:", error);
                }
            };

            fetchRecipe();
        }
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className="flex gap-24 p-20 m-auto">
            <div className="flex gap-8 max-w-[50%]">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-64 h-64 object-cover rounded-md mb-4"
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
                        Category: <Link href={`/?c=${recipe.strCategory}`} className='underline'>{recipe.strCategory}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
