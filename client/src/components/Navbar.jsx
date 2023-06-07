import './NavBar.css'
import Arrow from '../assets/Arrow.png'
import React from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    filterRecipeName,
    getAllDiets,
    firstFilter,
    secondFilter,
    orderRecipes,
    allRecipesDB,
    allRecipesApi,
    getRecipesCreated
    } from '../redux/actions';


export default function Navbar(){

    const dispatch = useDispatch()
    const location = useLocation()

    const Diets = useSelector(state => state.Diets)
    const recipesDB = useSelector(state => state.recipesDB)
    const createdRecipes = useSelector(state => state.createdrecipes)
    const Allrecipes = useSelector(state => state.Allrecipes)

    const [Value, setValue] = React.useState({
        search: '',
    });

    const handleChange=(e)=>{
        setValue(e.target.value)
    };

    function handleSubmit (e){
        e.preventDefault();
        dispatch(filterRecipeName(Value))
    }

    React.useEffect(() => {
        if (Diets.length === 0) {
            dispatch(getAllDiets())
        }}, [Diets])
    
    const handleDispatch = (e) => {
        const { name, value } = e.target;
        if (name === 'order') {
            return dispatch(orderRecipes(value))
        }
        else if (name === 'filter' || name == 'filter2') {
            if (value === 'Externas') {
                return dispatch(allRecipesApi())
            }
            if (value === 'Locales') {
                if (recipesDB.length === 0) {
                    return alert('the local DB is empty!')
                } else {
                    return dispatch(allRecipesDB())
                }
            }
            if (value === 'Created') {
                if (createdRecipes.length === 0) {
                    return alert('No recipes created in this session')
                } else {
                    return dispatch(getRecipesCreated())
                }
            }
            else {
                if (name === 'filter') return dispatch(firstFilter(value));
                if (name === 'filter2') return dispatch(secondFilter(value))
            }
        }
    };

    return(
    <div className='NavBar'>
        {location.pathname === '/home'? 
        <>
            <NavLink to='/create'>
                <button className='navButton'>Create Recipe</button>
            </NavLink>
            <NavLink to='/about'>
                <button className='navButton'>About</button>
            </NavLink>
            <div className='filtros' style={{fontWeight: "bold"}}>Order by:
                <select name="order" onChange={handleDispatch}>
                    <option value="default">Default</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="Max health score">Max health score </option>
                    <option value="Min health score">Min health score</option>
                </select>
            </div>
            <div className='filtros' style={{fontWeight: "bold"}}>
                First filter:
                <select name="filter" onChange={handleDispatch}>
                    <option value="default">Default</option>
                    <option value="Externas">External Recipes</option>
                    <option value="Locales">Local DB Recipes</option>
                    <option value="Created">Created in current session</option>
                    {Diets&&Diets.map(e=>{
                        return <option value={e.name} key={e.id}>{e.name}</option>
                    })}
                </select>
            </div>
            <div className='filtros' style={{fontWeight: "bold"}}>
                Second filter:
                <select name="filter2" defaultValue='default' onChange={handleDispatch}>
                    <option value='default'>Default</option>
                    <option value="Externas">External Recipes</option>
                    <option value="Locales">Local DB Recipes</option>
                    <option value="Created">Created in current session</option>
                    {Diets&&Diets.map(e=>{
                        return <option value={e.name} key={e.id}>{e.name}</option>
                    })}
                </select>
            </div>
            <form onSubmit={handleSubmit}>
                <input type='search' name={Value} placeholder='Search recipe' onChange={handleChange}/><button className='navButton'>Search</button>
            </form>
        </> 
        : <>
            <NavLink to='/home'>
                <button className='toHome'>
                    <img src={Arrow} style={{transform: 'rotate(90deg)', width: '30px'}} alt='Previous'/>
                    Back to Home
                </button>
            </NavLink>
            <NavLink to='/about'>
                <button className='navButton'>About</button>
            </NavLink>
        </>}
            
    </div>
    )
}