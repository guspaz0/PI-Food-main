import {GET_ALL_RECIPES,
    FILTER_RECIPE_ID,
    FILTER_RECIPE_NAME,
    CREATE_RECIPE,
    GET_ALL_DIETS,
    FILTER_FIRST,
    FILTER_SECOND,
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
        case FILTER_FIRST:
            let filter = []
            if (action.payload === 'default') {
                filter = state.copyRecipes
            }
            if (state.Diets.map((e) => e.name.includes(action.payload))) {
                filter = [...state.copyRecipes].filter((e) => e.diets.includes(action.payload))
            }
            return {
                ...state,
                Allrecipes: filter,
                filteredRecipes: filter,
            }
        case FILTER_SECOND:
            let filter2 = []
            if (action.payload === 'default') {
                filter2 = state.filteredRecipes
            }
            if (state.Diets.map((e) => e.name.includes(action.payload))) {
                filter2 = [...state.filteredRecipes].filter((e) => e.diets.includes(action.payload))
            }
            return {
                ...state,
                Allrecipes: filter2,
            }
        case ORDER_RECIPES:
            let orderCopy = [...state.Allrecipes];
            let orderNot = [...state.Allrecipes];
            function order (payload) {
                if (payload === "Default") return orderNot;
                return orderCopy.sort((a, b) => {
                    if (payload === "A-Z") return a.name.localeCompare(b.name);
                    if (payload === "Z-A") return b.name.localeCompare(a.name);
                    if (payload === "Max health score") return b.healthScore - a.healthScore;
                    if (payload === "Min health score") return a.healthScore - b.healthScore;
                });
            };
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
            const filterApiDb = [...state.Allrecipes].filter((e) => [...state.recipesApi].includes(e))
            return {
                ...state,
                Allrecipes: [...filterApiDb],
            }
        case ALL_RECIPES_DB:
            const filterDB = [...state.Allrecipes].filter((e) => [...state.recipesDB].includes(e))
            return {
                ...state,
                Allrecipes: [...filterDB],
            }
        case ALL_RECIPES_CREATED:
            const filterByCreated = [...state.Allrecipes].filter((e) => [...state.createdrecipes].includes(e))
            return {
                ...state,
                Allrecipes: [...filterByCreated]
            }
    default:
        return state;
    }
}