import styles from "./harvest.module.css"

const UnstakeButton  = () => {
    return ( 
        <div>
            <button className={styles.button}>
               <h2> STAKE</h2>
            </button>
        </div>
     );
}
 
export default UnstakeButton;