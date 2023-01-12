import { useState } from "react"
import Input from "../Form/Input"
import Submit from "../Form/Submit"

import styles from "../Projects/ProjectForm.module.css"

function ServiceForm({handleSubmit, btnText, projectData}){

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault();
        projectData.services.push(service) //insere o projeto
        handleSubmit(projectData)
    }
    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})

    }

        return(
            <form onSubmit={submit} className={styles.form}>
               <Input
                    type="text"
                    text="Nome do Serviço"
                    name="name"
                    placeholder="insira o nome do serviço"
                    handleOnChange={handleChange}
               />

                <Input
                    type="number"
                    text="Custo do Serviço"
                    name="cost"
                    placeholder="insira o valor total"
                    handleOnChange={handleChange}
               />

                <Input
                    type="text"
                    text="Descrição do Serviço"
                    name="description"
                    placeholder="Escreva o serviço"
                    handleOnChange={handleChange}
               />

               <Submit text={btnText}/>
            </form>
        )
}

export default ServiceForm