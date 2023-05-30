const { Recipe } = require('.././db');
//const allrecipes = require('../responseAll.json'); //para ahorrar peticiones a la api, guardo a la DB las primeras 100 recipes consultadas, previamente.

// const prueba = allrecipes.data.results.map((e) => {
//     return {
//     id: e.id,
//     name: e.title,
//     image: e.image
//     }
// });
const postRecipe = async (req,res) => {
    try { 
        const {name, image, diets, healthScore, summary, steps} = req.body;
        const storeRecipe = await Recipe.create({name, image, diets, healthScore, summary, steps});
        res.status(200).json(storeRecipe)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = postRecipe;