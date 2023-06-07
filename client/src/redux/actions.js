import axios from 'axios';

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const FILTER_RECIPE_ID = "FILTER_RECIPE_ID";
export const FILTER_RECIPE_NAME = "FILTER RECIPE NAME";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const ORDER_RECIPES = "RODER_RECIPE";
export const FILTER_FIRST = "FILTER_FIRST";
export const FILTER_SECOND = "FILTER_SECOND";
export const ALL_RECIPES_API = "ALL_RECIPES_API";
export const ALL_RECIPES_DB = "ALL_RECIPES_DB";
export const ALL_RECIPES_CREATED = "ALL_RECIPES_CREATED";


export const getAllRecipes = () => {
    return async function (dispatch) {
        try{
            const Allrecipes = await axios.get('http://localhost:3001/allrecipes');
            dispatch({
                type: GET_ALL_RECIPES,
                payload: Allrecipes.data,
            });
        } catch (error) {
            console.log(error.message)
        }
    };
};

export const getAllDiets = () => {
    return async function (dispatch) {
        try{
            const AllDiets = await axios.get('http://localhost:3001/diets')
            dispatch({
                type: GET_ALL_DIETS,
                payload: AllDiets.data,
            });
            } catch (error) {
                console.log(error.message)
            }
        };
    };


export function filterRecipeID(id) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`);
            dispatch({
                type: FILTER_RECIPE_ID,
                payload: response.data,
            });
        } catch (error) {
            console.log(error.message)
        }
    }
}
export function filterRecipeName(string) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes?name=${string}`);
            dispatch({
                type: FILTER_RECIPE_NAME,
                payload: response.data,
            });
        } catch (error) {
            console.log(error.message)
        }
    }
}

export function firstFilter(atribute) {
    return function (dispatch) {
        dispatch({
            type: FILTER_FIRST,
            payload: atribute,
        });
    }
}
export function secondFilter(atribute) {
    return function (dispatch) {
        dispatch({
            type: FILTER_SECOND,
            payload: atribute,
        });
    }
}

export function orderRecipes(atribute) {
    return function (dispatch) {
        dispatch({
            type: ORDER_RECIPES,
            payload: atribute,
        });
    }
}

export function createRecipe(form) {
    return async function (dispatch) {
        try {
            const postrecipe = await axios.post(`http://localhost:3001/recipes`, form)
            if (postrecipe.status === 200) {
                console.log({message: postrecipe.status})
                dispatch({
                    type: CREATE_RECIPE,
                    payload: postrecipe.data
                })
                return postrecipe.status
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

export function allRecipesApi() {
    return function (dispatch) {
        dispatch({
            type: ALL_RECIPES_API,
            payload: ''
        })
    }
}

export function allRecipesDB() {
    return function (dispatch) {
        dispatch({
            type: ALL_RECIPES_DB,
            payload: ''
        })
    }
}

export function getRecipesCreated() {
    return function (dispatch) {
        dispatch({
            type: ALL_RECIPES_CREATED,
            payload: ''
        })
    }
}