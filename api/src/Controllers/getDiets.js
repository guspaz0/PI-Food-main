require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env;
const {Diets} = require('.././db');
//const Testing = require('.././utils/responseAll.json');



const getApiDiets = async () => {
    try{
        const apiURL = 'https://api.spoonacular.com/recipes/complexSearch'
        //const apiResponse = Testing
        const apiResponse = await axios.get(apiURL, {
            params: {
                number: 100,
                addRecipeInformation: true,
                apiKey: API_KEY
            }
        });
        const apiDiets = []
        apiResponse.data.results.map((e) => {
            e.diets.map((x) => {
                if (!apiDiets.includes(x)) {apiDiets.push(x)};
                })
            })
        const DietsAPI = []
        apiDiets.map((e) => DietsAPI.push({name: e}))
        return DietsAPI
    } catch (error) {
        console.log({error: error.message})
    }
};

const getDiets = async (req,res) => {
    try { 
        const AllDiets = await Diets.findAll({raw: true});
        if (AllDiets.length === 0) { 
            const importDiet = await getApiDiets()
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