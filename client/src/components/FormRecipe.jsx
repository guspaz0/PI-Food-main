import './FormRecipe.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../redux/actions';
import { validation } from './validation';
import Arrow from '../assets/Arrow.png'



export default function FormRecipe(){

    
    const dispatch = useDispatch();

    const [errors, setErrors] = React.useState({
        name: null,
        image: null,
        diets: null,
        healthScore: null,
        summary: null,
        steps: null,
    });
    

    const [Form,setForm] = React.useState({
        name: '',
        image: '',
        summary: '',
        healthScore: '',
        steps: [{
            number: 1,
            step: '',
            ingredients: [{id: 1, name: ''}],
            equipment: [{id: 1, name: ''}],
            length: {number: null, unit: null}
            }],
        diets: []
        })

React.useEffect(()=> { 
}, [errors])

function handleStepsBtn (e) {
    e.preventDefault(e);
    
    if (e.target.name === 'add'){
        setForm(
            {
            ...Form,
            steps: [...Form.steps,
                {
                    number: Form.steps.length+1,
                    step: '',
                    ingredients: [{id: 1, name: ''}].sort((a,b) => a.id - b.id),
                    equipment: [{id: 1, name: ''}].sort((a,b) => a.id - b.id),
                    length: {number: null, units: null}
                }
            ].sort((a,b) => a.number - b.number),
        }
        )
    }
    if (e.target.name === 'del') {
        setForm(
            {
            ...Form,
            steps: Form.steps.slice(0,-1).sort((a,b) => a.number - b.number),
            }
        )
    }
}

function handleButtons (e) {
    e.preventDefault(e)
    const filterForm = Form.steps.filter((x) => String(x.number) !== e.target.value)
    const updateForm = Form.steps.filter((x) => String(x.number) === e.target.value)
    const {ingredients, equipment} = updateForm[0]
    if (e.target.name === 'addIng') {
        setForm(
            {
                ...Form,
                steps: [ ...filterForm,
                    {
                    ...updateForm[0],
                    ingredients: [
                        ...ingredients,
                        {
                            id: ingredients.length+1,
                            name: ''
                        }
                    ].sort((a,b) => a.id - b.id)
                    }
                ].sort((a,b) => a.number - b.number),
            }
        )
    }
    if (e.target.name === 'delIng') {
        setForm(
            {
                ...Form,
                steps: [ ...filterForm,
                    {
                        ...updateForm[0],
                        ingredients: ingredients.slice(0,-1).sort((a,b) => a.id - b.id)
                    }
                ].sort((a,b) => a.number - b.number),
            }
        )
    }
    if (e.target.name === 'addequip') {
        setForm(
            {
                ...Form,
                steps: [ ...filterForm,
                    {
                    ...updateForm[0],
                    equipment: [
                        ...equipment,
                        {
                            id: equipment.length+1,
                            name: ''
                        }
                    ].sort((a,b) => a.id - b.id)
                    }
                ].sort((a,b) => a.number - b.number),
            }
        )
    }
    if (e.target.name === 'delequip') {
        setForm(
            {
                ...Form,
                steps: [ ...filterForm,
                    {
                        ...updateForm[0],
                        equipment: equipment.slice(0,-1).sort((a,b) => a.id - b.id)
                    }
                ].sort((a,b) => a.number - b.number),
            }
        )
    }
}

function handleInputSteps(e) {
    e.preventDefault(e);
    const parameters = e.target.name.split(",")
    const validate = validation(Form);
    if (validate) {
        setErrors(validate)
    }
    
    if (parameters[0] === 'step')  {
        //console.log(e.target.name)
        const filterStep = Form.steps.filter((x) => x.number !== Number(parameters[1]));
        const updateStep = Form.steps.filter((x) => x.number === Number(parameters[1]))[0];
        return setForm(
            {
            ...Form,
            steps: [
                ...filterStep,
                {
                    ...updateStep,
                    step: e.target.value,
                }
            ].sort((a,b) => a.number-b.number),
        })
    };
    if (parameters[0] === 'ingredients') {
        const filterStep = Form.steps.filter((x) => x.number !== Number(parameters[1]));
        const updateStep = Form.steps.filter((x) => x.number === Number(parameters[1]))[0];
        const filterIngredients = updateStep.ingredients?.filter((x) => x.id !== Number(parameters[2]));
        return setForm(
            {
            ...Form,
            steps: [
                ...filterStep,
                {
                    ...updateStep,
                    ingredients: [
                        ...filterIngredients,
                        {
                            id: Number(parameters[2]),
                            name: e.target.value
                        }
                    ].sort((a,b) => a.id - b.id)
                }
            ].sort((a,b) => a.number-b.number),
        })
    } 
    if (parameters[0] === 'equipment'){
        const filterStep = Form.steps.filter((x) => x.number !== Number(parameters[1]));
        const updateStep = Form.steps.filter((x) => x.number === Number(parameters[1]))[0];
        const filterEquipment = updateStep.equipment?.filter((x) => x.id !== Number(parameters[2]));
        return setForm(
            {
            ...Form,
            steps: [
                ...filterStep,
                {
                    ...updateStep,  
                    equipment: [
                        ...filterEquipment,
                        {
                            id: Number(parameters[2]),
                            name: e.target.value,
                        }
                    ]
                }
            ].sort((a,b) => a.number - b.number),
        })
    }
    if (parameters[0] === 'length'){
        const filterStep = Form.steps.filter((x) => x.number !== Number(parameters[1]));
        const updateStep = Form.steps.filter((x) => x.number === Number(parameters[1]))[0];
        let value = e.target.value
        if (parameters[2] === 'number') {value = Number(e.target.value)}
        return setForm(
            {
            ...Form,
            steps: [
                ...filterStep,
                {
                    ...updateStep,  
                    length:
                        {
                            ...updateStep.length,
                            [parameters[2]]: value,
                        }
                }
            ].sort((a,b) => a.number - b.number),
        })
    }
    if (parameters[0] === 'diets') {
        if (Form.diets.includes(e.target.value)){
            const filterDiet = Form.diets.filter((x) => x !== e.target.value)
            setForm({
                ...Form,
                diets: [...filterDiet]
            })
        } else {
            setForm({
                ...Form,
                diets: [...Form.diets, e.target.value]
            })
        }
    } 
    else {
        return setForm({
            ...Form,
            [e.target.name]: e.target.value,
        })
    }
}


function handleSubmit(e) {
    e.preventDefault();

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }
        return true;
    }
    setErrors(validation(Form))

    if (isEmpty(errors)) {
        dispatch(createRecipe(Form))
        .then((data) => {
            if (data === 200) {alert('La Receta ha sido creada exitosamente en la base de datos!')}
            else {alert('Hubo un error al intentar crear la receta')}
        })
    } else {alert ('corregir errores del formulario')}

}

    return(
    <form className='FormRecipe' onSubmit={handleSubmit}>
        <h2>Formulario de Recetas</h2>
        <label>Nombre:
            <input type='text' name='name' placeholder='Ingresar Nombre...' onChange={handleInputSteps}></input> 
            {errors.name? <div className='errors'>{errors.name}</div> : null}
        </label>
        <label>Resumen del plato:
            <textarea type='text' name='summary' placeholder='Ingresar Resumen del plato...' onChange={handleInputSteps}></textarea> 
            {errors.summary? <div className='errors'>{errors.summary}</div> : null}
        </label>
        <label>Nivel de comida saludable (health Score):
            <input type='number' name='healthScore' placeholder='Ingresar health Score...' onChange={handleInputSteps}></input>
            {errors.healthScore? <div className='errors'>{errors.healthScore}</div> : null}
        </label>
        <label>imagen:
            <input name='image' placeholder='Ingresar URL de imagen...' onChange={handleInputSteps}></input>
            {errors.image? <div className='errors'>{errors.image}</div> : null}
            {Form.image? <img style={{width: '150px', borderRadius: '5px', borderStyle:'solid'}} src={Form.image} alt='img'/> : <></>}
        </label>
        <label>Paso a paso:
            <table className='formSteps'>
                <caption>Steps</caption>
                <thead></thead>
                <tbody>
                    <tr><th scope='col'>nro</th><th scope='col'>step</th><th style={{width: 150}}scope='col'>ingredients</th><th style={{width: 150}}scope='col'>equipment</th><th style={{width: 50}}scope='col'>length</th></tr>
                    {Form.steps.map((e) => {return <tr key={e.number}>
                        <th><input type='text' style={{width: 25}} name={`${e.number}`} value={e.number} readOnly onChange={handleInputSteps}/></th>
                        <td>
                            <textarea type='text' style={{height: '100px'}} name={`step,${e.number}`} placeholder='ingresar paso...' onChange={handleInputSteps}/>
                            {errors.steps? <p className='errors'>{errors.steps}</p> : null}
                        </td>
                        <td>
                        {e.ingredients.map((x) => {return <span key={x.id}>
                            <input type='text' style={{width: 25}} name={x} value={x.id} readOnly onChange={handleInputSteps}/>
                            <input type='text' name={`ingredients,${e.number},${x.id}`} placeholder='ingresar ingrediente...' onChange={handleInputSteps}/>
                            </span>})}
                            <button className='addStep' name='addIng' value={`${e.number}`} onClick={handleButtons}>Agregar</button>
                            <button className='addStep' name='delIng' value={`${e.number}`} onClick={handleButtons}>Quitar</button>
                        </td>
                        <td>
                            {e.equipment?.map((x) => { return <span>
                                <input type='text' style={{width: '25px'}} value={x.id} readOnly/>
                                <input type='text' name={`equipment,${e.number},${x.id}`} placeholder='ingresar equipamiento...' onChange={handleInputSteps}/>
                            </span>})}
                            <button className='addStep' name='addequip' value={`${e.number}`} onClick={handleButtons}>Agregar</button>
                            <button className='addStep' name='delequip' value={`${e.number}`} onClick={handleButtons}>Quitar</button>
                        </td>
                        <td>
                            <input type='number' style={{width: 60}} name={`length,${e.number},number`} placeholder='tiempo' onChange={handleInputSteps}/>
                            <select name={`length,${e.number},unit`} onChange={handleInputSteps}>
                                <option value=''></option>
                                <option value='minutes'>minutes</option>
                                <option value='seconds'>seconds</option>
                                <option value='hours'>hours</option>
                            </select>
                        </td>
                    </tr>})}
                </tbody>
                <tfoot></tfoot>
            </table>
            <button className='addStep' name='add' onClick={handleStepsBtn}>Agregar paso</button>
            <button className='addStep' name='del' onClick={handleStepsBtn}>Quitar ultimo</button>
        </label>

        <label>Tipo de dieta:</label>
            <span className='dietlist'>
                <select name='diets' style={{height: '150px'}}multiple onChange={handleInputSteps}>
                    <option value='vegan'>vegan</option>
                    <option value='gluten free'>gluten free</option>
                    <option value='dairy free'>dairy free</option>
                    <option value='lacto ovo vegetarian'>lacto ovo vegetarian</option>
                    <option value='pescatarian'>pescatarian</option>
                    <option value='whole 30'>whole 30</option>
                    <option value='paleo'>paleo</option>
                    <option value='ketogenic'>ketogenic</option>
                </select>
                <img src={Arrow} alt='--->>' style={{transform: 'rotate(-90deg)', width: '40px'}}/>
                <select name='diets' style={{height: '150px', width: '140px'}}multiple onChange={handleInputSteps}>
                    {Form.diets.map((s, index) => 
                    <option key={index} value={s}>{s}</option>)}
                </select>
            </span>
            {errors.diets? <div className='errors'>{errors.diets}</div> : null}
        <button className='submitform' type='submit'>Enviar</button>
    </form>
    )
}