import './App.css';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import HomePage from './components/Home';
import CardDetail from './components/CardDetail';
import FormRecipe from './components/FormRecipe';
import Navbar from './components/Navbar.jsx';
import Error from './components/Error.jsx';


function App() {

  const location = useLocation();

  return (<>
      {location.pathname !== '/' && <Navbar/>}
    <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/detail/:id' element={<CardDetail/>}/>
      <Route path='/create' element={<FormRecipe/>}/>
      <Route path='*' element={<Error/>} />
    </Routes>
  </>
  );
}

export default App;
