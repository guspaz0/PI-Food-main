import React from 'react';
import Arrow from '../assets/Arrow.png'


export default function Pagination({maxPage, page, setPage}){

    const [input, setInput] = React.useState(1)

    function handlePrevious() {
        setInput(page - 1);
        setPage(page - 1);
    }
    function handleNext() {
        setInput(page + 1);
        setPage(page + 1);
    }

    const onChangeHandler = (e) => {
        setInput(e.target.value);
    };
    
    const onKeyDownHandler = (e) => {
        if (e.keyCode === 13) {
            setPage(parseInt(e.target.value));
            if (
                parseInt(e.target.value < 1) ||
                parseInt(e.target.value) > Math.ceil(maxPage) ||
                isNaN(parseInt(e.target.value))
            ) {
                setPage(1);
                setInput(1);
        } else {
            setPage(parseInt(e.target.value));
        }
        }
    };

    return(
    <div style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
        <button onClick={handlePrevious} disabled={page <= 1} style={{marginTop:'0px', marginBottom: '0px', height: '45px'}}>
            <img src={Arrow} style={{transform: 'rotate(90deg)', width: '30px'}} alt='Previous'/>
        </button>
        <span style={{fontWeight: "bold", backgroundColor: 'White', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
        Pagina
        <input 
            name="page" 
            autoComplete="off" 
            style={{width: 20, fontWeight: "bold", backgroundColor: 'White', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}
            value={input}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}/>
        de {maxPage}</span>
        <button onClick={handleNext} disabled={page >= maxPage} style={{marginTop:'0px', marginBottom: '0px', height: '45px'}}>
        <img src={Arrow} style={{transform: 'rotate(-90deg)', width: '30px'}} alt='Next'/>    
        </button>
    </div>
    
    )
}