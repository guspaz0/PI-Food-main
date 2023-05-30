require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env;
//const Testing = require('.././responseAll.json');
const { Recipe } = require('../db');

const apiDiets = []
const AllrecipesAPI = []

const getAllRecipes = async () => {
    
    const apiURL = 'https://api.spoonacular.com/recipes/complexSearch'
    //const apiResponse = Testing
    const apiResponse = await axios.get(apiURL, {
        params: {
            number: 100,
            addRecipeInformation: true,
            apiKey: API_KEY
        }
    });
    
    const allrecipes = apiResponse.data.results.map((e) => {
        AllrecipesAPI.push({
            id: e.id,
            name: e.title,
            image: e.image,
            diets: e.diets,
            healthScore: e.healthScore,
            summary: e.summary.replace(/(<([^>]+)>)/gi, ""),
            steps: e.analyzedInstructions[0]?.steps
            });
        e.diets.map((x) => {
            if (!apiDiets.includes(x)) apiDiets.push(x);
        })

        return {
        id: e.id,
        name: e.title,
        image: e.image,
        diets: e.diets,
        healthScore: e.healthScore,
        summary: e.summary.replace(/(<([^>]+)>)/gi, ""),
        steps: e.analyzedInstructions[0]?.steps
        }})
    return allrecipes
};

//getAllRecipes();

const AllRecipesEnpoint = async (req, res) => {
    try {
        const recipesApi = await getAllRecipes()
        const recipedb = await Recipe.findAll()
        //const recipeApiDb = [...recipesApi, ...recipedb]
        if (AllrecipesAPI.length===0) {
            res.status(200).json({locales: recipedb, externas: recipesApi})
        } else {
            res.status(200).json({locales: recipedb, externas: AllrecipesAPI})
        }
        
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}
// const findRecipeByID = async (id) => {
//     const apiURL = `https://api.spoonacular.com/recipes/${id}/information`
//     const e = await axios.get(apiURL, {
//         params: {
//             addRecipeInformation: true,
//             apiKey: API_KEY
//         } 
//     });
//     return {
//         id: e.data.id,
//         name: e.data.title,
//         image: e.data.image,
//         diets: e.data.diets,
//         healthScore: e.data.healthScore,
//         summary: e.data.summary.replace(/(<([^>]+)>)/gi, ""),
//         steps: e.data.analyzedInstructions[0]?.steps
//     }
// };

async function allrecipedb (req,res) {
    try{
        const allrecipes = await Recipe.findAll()
        res.status(200).json(allrecipes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

module.exports = {getAllRecipes, AllRecipesEnpoint, allrecipedb}, apiDiets, AllrecipesAPI;