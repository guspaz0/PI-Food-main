const postRecipe = require('./postRecipe');
const { findRecipe, findRecipeID } = require('./findRecipe');
const getDiets = require('./getDiets')
const {getAllRecipes, AllRecipesEnpoint, allrecipedb} = require('./getAllRecipes')

module.exports = {
    findRecipeID,
    postRecipe,
    findRecipe,
    getDiets,
    getAllRecipes,
    AllRecipesEnpoint,
    allrecipedb,
    //findRecipeIDdb
}