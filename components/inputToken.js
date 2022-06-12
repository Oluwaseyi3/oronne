import { useRef, useCallback } from "react";
import styles from "./harvest.module.css"
import usdtlogo from "../public/usdtlogo.png"
import Image from "next/image"
import { Input } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

import UnstakeButton from "./UnstakeButton";

const InputToken = ({stakeTokens}) => {

    const stakeInputElement = useRef(null)

    const formHandler = (e) => {
        e.preventDefault()
        
        let amount   
         amount = stakeInputElement.current.value
        console.log(amount);
        amount = web3.utils.toWei(amount, 'Ether')
        stakeTokens(amount)
    }
    
    return ( 
        
            <form onSubmit={formHandler}>
            <div className={styles.harvestbodys}>

            <Input className={styles.inputbody} size="10"     type="text"   placeholder="0" inputRef={stakeInputElement}/>
        
            <Image src={usdtlogo} alt="" height={50} width={50}/>
            </div>
            <UnstakeButton type="submit"/>
       
            </form>
         
      
     );
}
 
export default InputToken;