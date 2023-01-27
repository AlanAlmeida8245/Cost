

import styles from "./ProjectForm.module.css"
import Input from "../Form/Input";
import Select from "../Form/Select";
import Submit from "../Form/Submit";


import {useEffect, useState} from "react"


function ProjectForm({handleSubmit, btnText, projectData})
{

    const [categories, setCategories] = useState([]) //useState das Categorias
    const [project, setProject] = useState(projectData || {})

        useEffect(() => {
            fetch("https://my-json-server.typicode.com/AlanAlmeida8245/Cost/categories", {
            method: "GET",
            header: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()) //pega os dados da resposta e passa para JSON
        .then((data) => {
            setCategories(data)
        })
        .catch((error) => console.log(error))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
  
    }

    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
     
    }

    return (
            <form onSubmit={submit} className={styles.form}>
                    <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.name ? project.name: ''}/>

                    <Input type="number" text="Orçamento do Projeto" name="budget" placeholder="Insira o orçamento do total" handleOnChange={handleChange} value={project.budget ? project.budget: ''} />
            
                <Select name="category_id" text="Selecione a Categoria" options={categories} handleOnChange={handleCategory} 
                value={project.category ? project.category.id : ''}
                
                />

              <Submit text={btnText}/>

            </form>
    )
}
export default ProjectForm;