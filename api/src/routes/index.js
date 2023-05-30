const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require('dotenv').config();
const {API_KEY} = process.env;
const { 
    findRecipeID,
    postRecipe,
    findRecipe,
    getDiets,
    AllRecipesEnpoint,
    allrecipedb,
    //findRecipeIDdb
    } = require('.././Controllers')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req,res) => {
    try {
        console.log(API_KEY)
        res.status(200).json({mensaje: 'api de PI foods Henry'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/recipes/:id', findRecipeID);
router.get('/recipes', findRecipe);
router.post('/recipes', postRecipe);
router.get('/diets', getDiets);
router.get('/allrecipes', AllRecipesEnpoint);
router.get('/allrecipesdb', allrecipedb);
//router.get('/recipesdb/:id', findRecipeIDdb)

module.exports = router;
