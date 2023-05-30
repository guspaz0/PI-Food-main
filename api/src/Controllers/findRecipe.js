require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env;
const {Recipe} = require('.././db');
const {getAllRecipes} = require('./getAllRecipes')



const findRecipeByName = async (name) => {
    //var allRecipes= []
    //const allApiRecipes = await prueba();
    // const allApiRecipes = await getAllRecipes();
    // const allDbRecipes = await Recipe.findAll();
    // const allRecipes = [...allApiRecipes, ...allDbRecipes]
    const Allrecipes = await getAllRecipes();
    var keys = name.toLowerCase().split(' ')
    var matches = [];
    keys.map((x) => {
        const match = Allrecipes.filter((e) => e.name.toLowerCase().includes(x))
        match.map((s) => {
            if (!matches.find((e) => e.id === s.id)) matches.push(s)
        })});
    return matches
}

const findRecipe = async (req,res) => {
    try {
        const {name} = req.query;
        const result= await findRecipeByName(name)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const findRecipeID = async (req,res) => {
    try {
        const {id} = req.params;
        const foundinDB = await Recipe.findOne({where: {id: String(id)}})
        if (foundinDB) {
            res.status(200).json(foundinDB)
        }
        else {
            const apiURL = `https://api.spoonacular.com/recipes/${id}/information`
            const apiResponse = await axios.get(apiURL, {
                params: {
                    addRecipeInformation: true,
                    apiKey: API_KEY
                }
            });
            const recipeinfo = () => {
                const {id, title, image, diets, healthScore, summary, analyzedInstructions } = apiResponse.data;
                return {
                    id: id,
                    name: title,
                    image: image,
                    diets: diets,
                    healthScore: healthScore,
                    summary: summary.replace(/(<([^>]+)>)/gi, ""),
                    steps: analyzedInstructions[0]?.steps
                }
            }
            if (recipeinfo()) {
                res.status(200).json(recipeinfo())
            }
            else {
                res.status(404).json({message: 'ID no encontrado'})
            }
    }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const findRecipeIDdb = async (req,res) => {
    try {
        const {id} = req.params;
        const result = await Recipe.findOne({where: {id: String(id)}})
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({message: 'ID no encontrado'})
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {findRecipe, findRecipeID, findRecipeIDdb};