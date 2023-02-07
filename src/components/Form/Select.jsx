

import styles from "./Select.module.css"

function Select({ text, name, options, handleOnChange, value})
{
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={handleOnChange}    required value={value || ''}>
                <option>Selecione uma Opção</option>
                {options.map((option) => (
                    <option value={option._id} key={option._id}>{option.nome}  </option>
                  
                ))}
            </select>
        </div>
    )
}

export default Select;