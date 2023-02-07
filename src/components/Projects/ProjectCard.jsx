
import styles from "./ProjectCard.module.css"
import {BsPencil, BsFillTrashFill} from "react-icons/bs"
import { Link } from "react-router-dom";

function ProjectCard({id, name, budget, category, handleRemove, cost}){

    const remove = (e) => {
        e.preventDefault()

        handleRemove(id)
        
    }
    
    

    return(
        <div className={styles.project_container}>
            <div className={styles.project_card}>
                <h4>{name}</h4>
                <p>
                    <span>Orçamento: </span>R$: {budget}
                </p>
                <p>
                    <span>Total já Utilizado: </span>R$: {cost}
                </p>
                <p className={styles.category_text}>
                    <span className={`${styles[category.name.toLowerCase()]}`}></span>  {category.name}
                </p>
                <div className={styles.project_card_actions}>
                    <Link to={`/project/${id}`}>
                        <BsPencil /> Editar
                    </Link>
                    <button onClick={remove}>
                            <BsFillTrashFill /> Excluir
                    </button>
                </div>
            </div>
        </div>
            
    )
}


export default ProjectCard;