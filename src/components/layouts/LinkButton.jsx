import styles from "./LinkButton.module.css"
import { Link } from "react-router-dom"

function LinkButton({to, texto}){
    return (
            <Link to={to} className={styles.btn}>
                {texto}
            </Link>
    )
}

export default LinkButton
