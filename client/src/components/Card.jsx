
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterRecipeID } from "../redux/actions";
import IMAGES from '../assets/diets';

export default function Card(props){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = async () =>{
        dispatch(filterRecipeID(props.id))
        .then(() =>{
            navigate(`/detail/${props.id}`,{replace: true})
        })
    }


    return(
            <div className="card" onClick={handleClick} key={props.id}>
                <img className='imgRecipe' src={props.image} alt='img'/>
                <span>
                    <img className='etiqueta' src={IMAGES.etiqueta} alt='Health Score'/>
                    <a className="HSetiqueta">{props.healthScore}</a>
                </span>
                <h3>{props.name}</h3>
                <a className="dietlist">{props.diets.map((e) => {
                    return <img key={e} className="imgdiets" src={ IMAGES[e] } alt={e}/>})}</a>
            </div>
    )
}