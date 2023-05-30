import {GET_ALL_RECIPES,
    FILTER_RECIPE_ID,
    FILTER_RECIPE_NAME,
    CREATE_RECIPE,
    GET_ALL_DIETS,
    FILTER_RECIPE_DIET,
    ORDER_RECIPES,
    ALL_RECIPES_API,
    ALL_RECIPES_DB,
    ALL_RECIPES_CREATED,
} from './actions';

const initialState = {
    Allrecipes: [],
    recipesDB: [],
    recipesApi: [],
    Diets: [],
    currentRecipe: [],
    // pages: [],
    copyRecipes: [],
    filteredRecipes: [],
    createdrecipes: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                Allrecipes: [...action.payload.locales, ...action.payload.externas],
                copyRecipes: [...action.payload.locales, ...action.payload.externas],
                recipesDB: [...action.payload.locales],
                recipesApi: [...action.payload.externas],
            }
        case GET_ALL_DIETS:
            return {
                ...state,
                Diets: action.payload,
            }
        case FILTER_RECIPE_ID:
            return {
                ...state,
                currentRecipe: action.payload,
            }
        case FILTER_RECIPE_NAME:
            return {
                ...state,
                Allrecipes: action.payload,
            }
        case FILTER_RECIPE_DIET:
            let filter = []
            //let filterNot = []
            //console.log(action.payload)
            if(state.currentOrigin === 'Locales') {
                if (action.payload === 'All diets') {
                    filter = state.recipesDB
                } else {
                    filter = [...state.recipesDB].filter((e) => e.diets.includes(action.payload))
                }
            } else {
                if (action.payload === 'All diets') {
                    filter = state.copyRecipes
                } else {
                    filter = [...state.copyRecipes].filter((e) => e.diets.includes(action.payload))
                }
            }
            return {
                ...state,
                Allrecipes: filter,
                filteredRecipes: filter,
            }
        case ORDER_RECIPES:
            let orderCopy = [...state.Allrecipes];
            let orderNot = [...state.filteredRecipes];
            //console.log("orderNot", orderNot);
            function order (payload) {
                if (payload === "Default") return orderNot;
                return orderCopy.sort((a, b) => {
                    // if (payload === "Asendente") return a.id - b.id;
                    // if (payload === "Desendente") return b.id - a.id;
                    if (payload === "A-Z") return a.name.localeCompare(b.name);
                    if (payload === "Z-A") return b.name.localeCompare(a.name);
                    if (payload === "Max health score") return b.healthScore - a.healthScore;
                    if (payload === "Min health score") return a.healthScore - b.healthScore;
                });
            };
            // if (action.payload === 'Ascendente') {
            //     OrderedRecipes = state.copyRecipes.sort();
            // }
            return {
                ...state,
                Allrecipes: order(action.payload)
            }
        case CREATE_RECIPE:
            return {
                ...state,
                createdrecipes: [...state.createdrecipes, action.payload],
                recipesDB: [...state.recipesDB, action.payload]
            }
        case ALL_RECIPES_API:
            return {
                ...state,
                Allrecipes: [...state.recipesApi],
            }
        case ALL_RECIPES_DB:
            return {
                ...state,
                Allrecipes: [...state.recipesDB],
            }
        case ALL_RECIPES_CREATED:
            return {
                ...state,
                Allrecipes: [...state.createdrecipes]
            }
    default:
        return state;
    }
}