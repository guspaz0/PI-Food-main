import './CardDetail.css'
import { useDispatch, useSelector } from "react-redux"
import React from 'react';
import { useParams } from "react-router-dom";
import { filterRecipeID, getAllRecipes } from "../redux/actions";
import IMAGES from '../assets/diets'


export default function CardDetail(){


    const {id} = useParams();
    
    const Detail = useSelector(state => state.currentRecipe)
    const Allrecipes = useSelector(state => state.Allrecipes)

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (Allrecipes.length === 0) {
            dispatch(getAllRecipes())
            .then(() => {
                dispatch(filterRecipeID(id))})
}}, [Allrecipes, id])
    

    return(<div>
    <div className="Detail">
        <span>
            <h3>{Detail.name}</h3>
            <h4>Diets:</h4>
            <div className='DietGrid'>
                {Detail.diets?.map((e, index) => {return <span key={index}><img className='Dietimg' src={IMAGES[e]} alt={e}/></span>})}
            </div>
            <h3>HealthScore:</h3> <h3>{Detail.healthScore}</h3>
        </span>
        <span>
        <img className='imgdetail' src={Detail.image} alt='img'/>
        </span>
        <span>
            <p>{Detail.summary}</p>
        </span>
    </div>
        <table>
            <caption style={{backgroundColor: 'yellow'}}><h3>Step to step:</h3></caption>
            <tbody>
            <tr><th>Number</th><th>Step</th><th>ingredients</th><th>equipment</th><th>length</th></tr>
            {Detail.steps?.map((s) => {return <>
                <tr key={s.number+Date.now()}>
                    <td>{s.number}</td>
                    <td>{s.step}</td>
                    <td>{s.ingredients?.map((x) => {
                        return <li key={x.id}>{x.name}</li>})}</td>
                    <td>{s.equipment?.map((x) => {
                        return <li key={x.id}>{x.name}</li>})}</td>
                    <td>{s.length?.number} {s.length?.unit}</td>
                </tr>
                </>})}
            </tbody>
        </table>
    </div>
    
    )
}