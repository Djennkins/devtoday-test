'use client'

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import {RecipeInterface} from "@/types/recipe";
import {useRouter, useSearchParams} from 'next/navigation'

const RecipeList = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedFilter, setSelectedFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [recipes, setRecipes] = useState<RecipeInterface[]>([]);

    const fetchRecipes = async (filter: string, search?: string) => {
        let url = 'http://localhost:5000/api/recipes';

        if (filter !== "all" && search) {
            url += `?filterBy=${filter}&filterValue=${search}`;
        }

        try {
            const response = await axios.get(url);
            if (!Array.isArray(response.data.meals)) {
                return setRecipes([]);
            }
            return setRecipes(response.data.meals);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const filters = [...searchParams.keys()];
        if (filters.length > 0) {
            const filterKey = filters[0];
            const filterValue = searchParams.get(filterKey) || '';
            setSelectedFilter(filterKey);
            setSearchTerm(filterValue);
            fetchRecipes(filterKey, filterValue);
        } else {
            setSelectedFilter('all');
            setSearchTerm('');
            fetchRecipes('all');
        }
    }, [searchParams]);

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-4">
            <div>
                <Tabs value={selectedFilter} onValueChange={(value) => {
                    setSelectedFilter(value)
                    setSearchTerm('');
                }}>
                    <TabsList className="w-full flex justify-center gap-2">
                        <TabsTrigger value="all" onClick={() => router.push("/")}>
                            All
                        </TabsTrigger>
                        <TabsTrigger value="i">Ingredient</TabsTrigger>
                        <TabsTrigger value="c">Category</TabsTrigger>
                        <TabsTrigger value="a">Area</TabsTrigger>
                    </TabsList>
                </Tabs>

                {selectedFilter !== "all" && (
                    <div className="flex gap-2 mt-2">
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={'Search'}
                        />
                        <Link href={`/?${selectedFilter}=${searchTerm}`}>
                            <Button>Search!</Button>
                        </Link>
                    </div>
                )}
            </div>
            {recipes.length > 0 ?
                (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {recipes.map((recipe) => (
                            <Card key={recipe.idMeal}>
                                <CardHeader>
                                    <CardTitle>{recipe.strMeal}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={recipe.strMealThumb}
                                        alt={recipe.strMeal}
                                        className="w-full h-64 object-cover rounded-md mb-4"
                                    />
                                    <Button>
                                        <Link href={`/recipes/${recipe.idMeal}`}>
                                            Get Recipe
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>There are no recipes!</p>
                )
            }
        </div>
    );
};

export default RecipeList;
