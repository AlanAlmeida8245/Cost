


import Message from "../layouts/Message";
import {useLocation} from "react-router-dom"
import styles from "./Projects.module.css"
import  Container  from "../layouts/Container";
import Loading from "../layouts/Loading";
import LinkButton from "../layouts/LinkButton";
import ProjectCard from "../Projects/ProjectCard";
import { useEffect, useState } from "react";

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation;
    let message = ""
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/AlanAlmeida8245/Cost/projects', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
         .then(data => {
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
         }).catch(erro => console.log(erro))
    }, [])

    function removeProject(id){
        fetch(`https://my-json-server.typicode.com/AlanAlmeida8245/Cost/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id != id))
            setProjectMessage('Projeto removido com sucesso!')
            //message
        })
        .catch(error => console.log(error))

    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>  
            </div>
            <div className={styles.space_sla}>
                <LinkButton to="/newproject" texto="Criar Projeto"/> 
            </div>

            {message && <Message type="success" msg={message}/>}
            <Container customClass="start">
                    {projects.length > 0 &&
                        projects.map((project) => 
                             <ProjectCard 
                             id={project.id}
                             name={project.name}
                             budget={project.budget}
                             category={project.category.name}
                             key={project.id}
                             handleRemove={removeProject}
                             
                             />
                        )}
                        {!removeLoading && <Loading />}
                        {removeLoading && projects.length === 0 &&(

                                    <p>Não há projetos cadastrados</p>
                        )}
                    


            </Container>
        </div>
    )

}

export default Projects;