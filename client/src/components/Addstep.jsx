import React from 'react';


export default function Addstep(props){

    const [ingredients, setIngredients] = React.useState([{
        id: 1,
        name: '',
        image: ''
    }])

    return(
    <tr>
        <td><input type='text' style={{width: 25}} name='nro' value={props.stepnro}/></td>
        <td><textarea type='text' name='step' placeholder='ingresar paso...'/></td>
        <td>
            {ingredients.map((e) => {return <>
                <input type='text' style={{width: 25}} name={e.id} autoFocus value={e.id}/>
                <input type='text' name={e.name} placeholder='ingresar nombre...'/>
                </>})}
            <button className='addStep' onClick={() => setIngredients([...ingredients, {id: ingredients.length+1, name: ''}])}>Agregar</button>
            <button className='addStep' onClick={() => setIngredients([...ingredients.slice(0,-1)])}>Quitar</button>
        </td>
    </tr>
    )
}