import { useState } from 'react'
import reactLogo from './assets/react.svg'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

//Páginas
import Home from './components/pages/Home.jsx'
import Contact from './components/pages/Contact.jsx'
import NewProject from './components/pages/NewProject.jsx'
import Company from './components/pages/Company.jsx'
import Projects from './components/pages/Projects.jsx'
//-----------------------------------------------------

import Container from './components/layouts/Container.jsx'
import Navbar from './components/layouts/Navbar.jsx'
import Footer from './components/layouts/Foote.jsxr'
import ProjectEdit from './components/pages/ProjectEdit.jsx'

  function App() {

    return (

        <div>

          
      <Navbar />
         

      <Container customClass="min-height">

   
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/contact' element={ <Contact /> }/>
                <Route  path='/newproject' element={ <NewProject /> }/>
                <Route  path='/project/:id' element={ <ProjectEdit /> }/>
                <Route path='/company' element={<Company />} />
            </Routes>
       
        </Container>    

        <Footer />

        </div>
    )
  }

  export default App
