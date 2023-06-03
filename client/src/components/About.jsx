import './About.css'
import IMAGES from '../assets/aptitudes';

export default function About(){

    const aptitudes = ['github', 'javascript', 'postgres', 'sequelize', 'react', 'redux', 'node', 'python']

    return(
    <div>
        <h1>About</h1>
        <div className='about'>
            <p> Hola, soy un apasionado de la tecnologia de la informacion, Soy programador Full Stack Developer. Puedo decir que la gran mayoria de mi experiencia laboral fue en el ambito administrativo privado en tareas relacionados a la informacion y toma de deciciones, por lo cual me identifico mas como un desarrollador Backend</p>
            <h3>Mis aptitudes son:</h3>
            <span className='aptitudes'>
                {aptitudes.map((e) => {return <h5 className='imgtext'>{e}{"\n"}<img src={IMAGES[e]} alt={e}/></h5>})}
            </span>
        </div>
    </div>
    )
}