import { useState } from "react"
import Input from "../Form/Input"
import Submit from "../Form/Submit"
import { parse, v4 as uuidv4 } from 'uuid'

import styles from "../Projects/ProjectForm.module.css"

function ServiceForm({handleSubmit, btnText, projectData}){

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault();
       service.id = uuidv4()

       handleSubmit(projectData, service)
    }
    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

        return(
            <form onSubmit={submit} className={styles.form}>
               <Input
                    type="text"
                    text="Nome do Serviço"
                    name="nomeServico"
                    placeholder="insira o nome do serviço"
                    handleOnChange={handleChange}
               />

                <Input
                    type="number"
                    text="Custo do Serviço"
                    name="custoServico"
                    placeholder="insira o valor total"
                    handleOnChange={handleChange}
               />

                <Input
                    type="text"
                    text="Descrição do Serviço"
                    name="descricao"
                    placeholder="Escreva o serviço"
                    handleOnChange={handleChange}
               />

               <Submit text={btnText}/>
            </form>
        )
}

export default ServiceForm