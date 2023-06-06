import './About.css'
import IMAGES from '../assets/aptitudes';


export default function About(){

    const linkedinURL = 'https://www.linkedin.com/in/gustavo-rodolfo-paz-767951118/'
    const githubURL = 'https://github.com/guspaz0'

    const aptitudes = ['javascript', 'postgres', 'sequelize', 'react', 'redux', 'node']

    return(
    <div>
        <h1>About</h1>
        <div className='about'>
            <div className='aboutMe'>
                <h2>About App</h2>
                <p>Este es un proyecto individual destinado a aplicar todos los conocimientos adquiridos durante el curso de Desarrollador web Full Stack de Henry.
                al ingresar al 'Home', Muestra las primeras 100 recetas consultadas a la API de 'Spoonacular', mostrando de a 9 cards por pagina, y al hacer click en una de ellas, muestra el detalle de la card. en el 'Navbar' se incluyen filtros de ordenamiento y filtros de cards. Tambien hay un boton para crear recetas que te redirige a un formulario que el usuarios debera completar y al enviar, si todo ocurrio como se esperaba, se guardara en una api o 'backend' que contiene una base de datos SQL (postgres) localmente, diferente al de Spoonacular
                </p>
                <h3>Tecnologias usadas en esta App:</h3>
            <span className='aptitudes'>
                {aptitudes.map((e,index) => {return <h5 key={index} className='imgtext'>{e}{"\n"}<img src={IMAGES[e]} alt={e}/></h5>})}
            </span>
            </div>
            <div className='aboutMe'>
                <h2>About Me</h2>
                <h4 lang='es'> Hola, soy un apasionado de la tecnologia de la informacion, Soy programador Full Stack Developer. Puedo decir que la gran mayoria de mi experiencia laboral fue en el ambito administrativo privado en tareas relacionados a la informacion y toma de deciciones, por lo cual me identifico mas como un desarrollador orientado al Backend, aunque estoy siempre predispuesto a aprender algo nuevo</h4>
            
                <p lang='en'> Hi, i am a passionate of information tecnology, i am q full stack web developer. i can say than a lot of my labor experience belongs to private administrative enviroments in tasks relationed with information and decisions choice, after then i am more oriented to backend developer, but always im open to learn new habilities</p>
                <div className='aptitudes'>
                    <button><h5 className='imgtext'>Estoy en {"\n"}<a href={linkedinURL}><img src={IMAGES.linkedin} style={{width: '150px'}}alt='Linkedin'/></a></h5></button>
                    <button><h5 className='imgtext'>GitHub{"\n"}<a href={githubURL}><img src={IMAGES.github} alt='Linkedin'/></a></h5></button>
                </div>
            </div>
            
        </div>
    </div>
    )
}