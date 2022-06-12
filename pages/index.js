import {useState, useEffect} from "react"
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import Navbar from "../components/navbar"
import UsdtToken from "../abis/UsdtToken.json"
import OronneToken from "../abis/OronneToken.json"
import TokenFarm from "../abis/TokenFarm.json"
import Harvest from "../components/harvest"
import InputToken from "../components/inputToken"
import UnstakeButton from "../components/UnstakeButton"
import TextBox from "../components/textBox"

function HomePage() {

   const [account, setAccounts] = useState("0")
   const [usdtToken, setUsdtToken] = useState({})
   const [usdtTokenBalance, setusdtTokenBalance] = useState("0")
   const [oronneToken, setoronneToken] = useState({})
   const [oronneTokenBalance, setoronneTokenBalances] = useState("0")
   const [tokenFarm, settokenFarm] = useState({})
   const [stakingBalance, setstakingBalance] = useState("0")
   const [loading, setLoading] = useState("false")

// In Node.js use: const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider);

   const loadWeb3 = async() => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    }


  const loadBlockchainData = async()=> {
      const web3 = window.web3
  
      const accounts = await web3.eth.requestAccounts()
     

      setAccounts( accounts[0] )

      const networkId = await web3.eth.net.getId()
 
 
        // Load DaiToken
      const usdtTokenData = UsdtToken.networks[networkId]
      if(usdtTokenData) {
        const usdtTokens = new web3.eth.Contract(UsdtToken.abi, usdtTokenData.address)
        // this.setState({ usdtToken })
        // console.log(usdtTokens);
        setUsdtToken(usdtTokens)
      
        let usdtTokenBalances = await usdtTokens.methods.balanceOf(accounts[0]).call()
        usdtTokenBalances = usdtTokenBalances.toString()
        setusdtTokenBalance(usdtTokenBalances)
        console.log(usdtTokenBalance);
        // setusdtTokenBalance
      } else {
        window.alert('DaiToken contract not deployed to detected network.')
      }


      const oronneTokenData = OronneToken.networks[networkId]
      if(oronneTokenData) {
        const oronneTokens = new web3.eth.Contract(OronneToken.abi, oronneTokenData.address)
        setoronneToken(oronneTokens)
        let oronneTokenBalances = await oronneTokens.methods.balanceOf(accounts[0]).call()
        setoronneTokenBalances( oronneTokenBalances.toString())
      } else {
        window.alert('OronneToken contract not deployed to detected network.')
      }

      const tokenFarmData = TokenFarm.networks[networkId]
      if(tokenFarmData) {
        const tokenFarms = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
        settokenFarm(tokenFarms)
        let stakingBalances = await tokenFarms.methods.stakingBalance(accounts[0]).call()
        // console.log(stakingBalances);
        setstakingBalance( stakingBalances.toString())
   
      } else {
        window.alert('TokenFarm contract not deployed to detected network.')
      }
  
       setLoading("false")


   
  
  }

  const stakeTokens = (amount) => {
    setLoading("true")
    usdtToken.methods.approve(tokenFarm._address, amount).send({ from: account }).on('transactionHash', (hash) => {
       tokenFarm.methods.stakeTokens(amount).send({ from: account }).on('transactionHash', (hash) => {
        setLoading("false")
      })
    })
  }

  const unstakeTokens = (amount) => {
       setLoading("true")
      tokenFarm.methods.unstakeTokens().send({ from: account }).on('transactionHash', (hash) => {
        setLoading("false")
    })
  }


    useEffect(() => {
      loadWeb3()
      loadBlockchainData()
    }, [])
    
  
  return <div>
     <Navbar account={account}/>
     <div className={styles.main}>   
       <div> <TextBox/> </div>
        <div className={styles.card}>
          
        <div className={styles.texter}>
           <div className={styles.texterb}>
             <h3>Yield $ORON</h3>
             <h3>{web3.utils.fromWei(oronneTokenBalance, 'Ether')}</h3>
           </div>
          
           <div className={styles.texterb}>
             <h3>USDT Balance</h3>
             <h3>${web3.utils.fromWei(usdtTokenBalance, 'Ether')}</h3>
           </div>
        </div>
      
       <div className={styles.spanWidth}>
        <span>Locked value</span>
        </div>
           <Harvest unstakeTokens={unstakeTokens} stakingBalance={stakingBalance}/>
           {/* <span></span> */}
           <InputToken  stakeTokens={stakeTokens}/>
           {/* <UnstakeButton/> */}
        </div>
     </div>
  </div>
}

export default HomePage