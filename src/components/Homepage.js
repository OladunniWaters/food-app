import React from "react";
import { useState, useEffect } from "react";
//import RandomRecipe from "./RandomRecipe";
import Recipe from "./Recipe";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar"


const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="

export default function Homepage() {
  
 //RECIPE FUNCTION
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
 
  
  const fetchRecipe = async () => {
    const url = apiUrl + query
    const response = await fetch(url)
    const data = await response.json();
    setRecipes(data.meals);
  }
  
  useEffect(() => {
    fetchRecipe();
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipe();
  }
  
  
  return (
      <> 
      
        <Navbar />
     
         <SearchBar
            value={query}
            handleSubmit={handleSubmit}
            onChange={e => setQuery(e.target.value)}
         />
    

              <h1>RECIPES</h1>
              <div className="recipe-container">
                  <div className="recipes">
                   {recipes ? recipes.map(recipe => (
                       <Recipe
                          key={recipe.idMeal}
                          recipe={recipe}
                          
                       />
                   )): "No Recipes Found!"}
                   </div>
             </div>
          
          
         
         
      </>
    )
}