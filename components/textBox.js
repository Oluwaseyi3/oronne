import styles from "./harvest.module.css"
const TextBox = () => {
    return ( 
        <div className={styles.textbody}>
            <div><h1>A Smart and Easy <br/> DeFi staking Platform</h1></div>
             <div><p> Oronne is a simple DeFi staking App that allows you<br/>
                 stake mock $USDT tokens and earn $ORON tokens<br/> over a period of time
                 </p></div>

             <div><button> Learn More</button></div>
        </div>
     );
}
 
export default TextBox;