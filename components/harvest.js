import styles from "./harvest.module.css"
import Web3 from 'web3'
const Harvest= ({unstakeTokens, stakingBalance }) => {
    const web3 = new Web3(Web3.givenProvider);
    return ( 
  
             <div className={styles.harvestbody}>
                
            <div>
                <h3><span>$</span>{web3.utils.fromWei(stakingBalance, 'Ether')}</h3>
            </div>
             <div>
                 <button className={styles.boxbutton}
                    onClick={(event) => {
                        event.preventDefault()
                       unstakeTokens()}}>Harvest </button>
             </div>
        </div>
      
       
     );
}
 
export default Harvest;