import './About.css'
import IMAGES from '../assets/aptitudes';
import {useRef} from 'react';
import { useNavigate } from 'react-router-dom';

export default function About(){

    const navigate = useNavigate()
    const linkedinURL = 'https://www.linkedin.com/in/gustavo-rodolfo-paz-767951118/'
    const githubURL = 'https://github.com/guspaz0'

    const aptitudes = ['javascript', 'postgres', 'sequelize', 'react', 'redux', 'node']

    return(
    <div>
        <h1>About</h1>
        <div className='about'>
            <p> Hola, soy un apasionado de la tecnologia de la informacion, Soy programador Full Stack Developer. Puedo decir que la gran mayoria de mi experiencia laboral fue en el ambito administrativo privado en tareas relacionados a la informacion y toma de deciciones, por lo cual me identifico mas como un desarrollador Backend</p>
            <a href={linkedinURL}>Estoy en <img src={IMAGES.linkedin} style={{width: '150px'}}alt='Linkedin'/></a>
            {"\n"}
            <a href={githubURL}>Repositorios <img src={IMAGES.github} alt='Linkedin'/></a>
            <h3>Teconologias usadas en esta App:</h3>
            <span className='aptitudes'>
                {aptitudes.map((e,index) => {return <h5 key={index} className='imgtext'>{e}{"\n"}<img src={IMAGES[e]} alt={e}/></h5>})}
            </span>
        </div>
    </div>
    )
}