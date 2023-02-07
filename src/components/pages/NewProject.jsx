
import styles from "./NewProject.module.css"
import ProjectForm from "../Projects/ProjectForm";
import { useNavigate } from "react-router-dom";


function NewProject(){

    
    const history = useNavigate()

    function createPost(project){
        //initialize  cost and services
        
            
            project.cost = 0
            project.services = []
        
        

        fetch("https://back-end-costs-production.up.railway.app/cadastrar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data) => {
           
            //redirect
            history('/projects', { state: { message: 'Projeto criado com sucesso!' } })

        }).catch(error => console.log(error))
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto pra depois adicionar serviço</p>  
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
            
        </div>
    )
}

export default NewProject;