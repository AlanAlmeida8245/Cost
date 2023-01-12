import { useState } from 'react'
import reactLogo from './assets/react.svg'

import { Routes, Route, Link } from "react-router-dom"

//Páginas
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'
import Company from './components/pages/Company'
import Projects from './components/pages/Projects'
//-----------------------------------------------------

import Container from './components/layouts/Container'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import ProjectEdit from './components/pages/ProjectEdit'

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
