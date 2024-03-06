import styles from './RenderFormComponents.module.css';

export const renderField = ({ label , type , input , meta : {touched , error} , placeholder, max , disabled}) => (
    <div className="input-row">
        <label className={styles.label}>{label}</label> 
      <input {...input} type={type} placeholder = {placeholder} max={max} disabled={disabled} className={styles.input}/>
      {touched && error &&
       <span className={styles.error}>{error}</span>}
    </div>
  );