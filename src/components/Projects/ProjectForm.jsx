

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
            fetch("https://back-end-costs-production.up.railway.app/https://back-end-costs-production.up.railway.app/categorias", {
            method: "GET",
            header: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()) //pega os dados da resposta e passa para JSON
        .then((data) => {
            setCategories(data)
            console.log(data)
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
        setProject({...project, categoria: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
     
    }

    return (
            <form onSubmit={submit} className={styles.form}>
                    <Input type="text" text="Nome do Projeto" name="nome" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.nome ? project.nome: ''}/>

                    <Input type="number" text="Orçamento do Projeto" name="orcamento" placeholder="Insira o orçamento do total" handleOnChange={handleChange} value={project.orcamento ? project.orcamento: ''} />
            
                <Select name="category_id" text="Selecione a Categoria" options={categories} handleOnChange={handleCategory} 
                value={project.categoria ? project.categoria.id : ''}
                
                />

              <Submit text={btnText}/>

            </form>
    )
}
export default ProjectForm;