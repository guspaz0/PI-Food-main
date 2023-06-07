import './Landingpage.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllRecipes, getAllDiets } from '../redux/actions';
import { useSelector } from 'react-redux';
import Loader from '../assets/loader.gif';
import Video from '../assets/videoplayback-0-18.mp4'


export default function LandingPage(){
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const Allrecipes = useSelector(state => state.Allrecipes)

    const [Loading,setLoading] = React.useState(false)

    const handleClick= () => {
        if (Allrecipes.length === 0){
            setLoading(true);
            dispatch(getAllRecipes())
            .then(() => 
                dispatch(getAllDiets()))
            .then(() =>
                setLoading(false),
                navigate('/home'))
            .catch((error) => console.log(error))
        }        
    }

    return(<>
        <h1 className='Landing'>Henry Foods PI</h1>
        <button className='landingbutton' onClick={handleClick}>Redirect to Home</button>
        {Loading? <img src={Loader} alt='Loading'/>: <></>}
        <div id="loading">
            <video id="bgvideo" autoPlay loop muted>
                <source src={Video} type='video/mp4'/>
            </video>
        </div>
        
        
    </>
    )
}