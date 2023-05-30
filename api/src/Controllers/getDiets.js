const {Diets} = require('.././db');
//const Testing = require('../responseAll.json')
const apiDiets = require('./getAllRecipes')

const importDiet = apiDiets


// const getApiDiets = async () => {
    
    //const apiURL = 'https://api.spoonacular.com/recipes/complexSearch'
    //const apiResponse = Testing
    // const apiResponse = await axios.get(apiURL, {
    //     params: {
    //         number: 100,
    //         addRecipeInformation: true,
    //         apiKey: API_KEY
    //     }
    // });
//     const apiDiets = []
//     apiResponse.data.results.map((e) => {
//         e.diets.map((x) => {
//             if (!apiDiets.includes(x)) apiDiets.push(x);
//             })
//         })
//     apiDiets.map((e) => {importDiet.push({name: e})});
// };
//getApiDiets()


//const bulkdiet = apiDiets.map((e) => {return {name: e}})

const getDiets = async (req,res) => {
    try { 
        const AllDiets = await Diets.findAll();
        if (AllDiets.length === 0) { 
            const createDB = await Diets.bulkCreate(importDiet)
            res.status(200).json(createDB)
        } else {
            res.status(200).json(AllDiets)
        }
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}



module.exports = getDiets;