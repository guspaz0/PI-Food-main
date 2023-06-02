import './NavBar.css'
import Arrow from '../assets/Arrow.png'
import React from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    filterRecipeName,
    getAllDiets,
    filterRecipeDiet,
    orderRecipes,
    allRecipesDB,
    allRecipesApi,
    getRecipesCreated
    } from '../redux/actions';


export default function Navbar(){

    const dispatch = useDispatch()
    const location = useLocation()

    const Diets = useSelector(state => state.Diets)

    const [Value, setValue] = React.useState({
        search: '',
    })

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
        }}, [])
    
    const handleDispatch = (e) => {
        const { name, value } = e.target;
        if (name === 'order') {
            return dispatch(orderRecipes(value))
        }
        else if (name === 'filter') {
            if (value === 'Externas') {
                return dispatch(allRecipesApi())
            }
            if (value === 'Locales') {
                return dispatch(allRecipesDB())
            }
            if (value === 'Created') {
                return dispatch(getRecipesCreated())
            }
            if (Diets.map((x) => x.name === value)) {
                return dispatch(filterRecipeDiet(value))
            }
        }
    };

    return(
    <div className='NavBar'>
        {location.pathname === '/home'? <>
        <NavLink to='/create'>
            <button className='navButton'>Crear Receta</button>
        </NavLink>
        <div className='filtros' style={{fontWeight: "bold"}}>Order by:
            <select name="order" onChange={handleDispatch}>
                <option value="Default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Max health score">Max health score </option>
                <option value="Min health score">Min health score</option>
            </select>
            Filter By:
            <select name="filter" onChange={handleDispatch}>
                <option value="All diets">All diets</option>
                <option value="Externas">Externas</option>
                <option value="Locales">Locales</option>
                <option value="Created">Created</option>
                {Diets&&Diets.map(e=>{
                    return <option value={e.name} key={e.id}>{e.name}</option>
                })}
            </select>
        </div>
        <form onSubmit={handleSubmit}>
            <input name={Value} placeholder='Buscar receta' onChange={handleChange}/><button className='navButton'>Enviar</button>
        </form></> 
        :<NavLink to='/home'>
            <button className='toHome'>
                <img src={Arrow} style={{transform: 'rotate(90deg)', width: '30px'}} alt='Previous'/>
                Back to Home
            </button>
        </NavLink>}
    </div>
    )
}