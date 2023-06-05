//import { getAllRecipes, getAllDiets } from '../redux/actions';
import './Home.css';
import { useSelector } from 'react-redux';
import Error from './Error';
import React from 'react';
import Card from './Card';
import Pagination from './Pagination';
import loader from '../assets/loader.gif';



export default function HomePage(props){

    //const dispatch = useDispatch();
    const Allrecipes = useSelector(state => state.Allrecipes)
    

    const [page, setPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(9);
    const maxPage = Math.ceil(Allrecipes.length / perPage);

    const [Loading,setLoading] = React.useState(true)

    React.useEffect(()=>{
        if(Allrecipes.length === 0){
            setLoading(true)
        }else{
            setLoading(false)
        }
    }, [Allrecipes]);

    return(
    <div>

        <Pagination maxPage={maxPage} page={page} setPage={setPage}/>
        {(Loading)? <div style={{paddingTop:'100px',height:'100vh'}}><img src={loader} alt='Loading...'/></div> : null}
        <div className='cards'>
        {Allrecipes.length === 0 || typeof Allrecipes==='string' || typeof Allrecipes[Allrecipes.length-1] === 'string'
            ? <h1>Not result</h1>
            : Allrecipes.length > 0? 
                Allrecipes.slice((page-1) * perPage,(perPage+(page-1) * perPage)).map((e) => <Card key={e.id} id={e.id} name={e.name} healthScore={e.healthScore} image={e.image} diets={e.diets}/>)
                : <Error/>}
        </div>
    </div>
    )
}