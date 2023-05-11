import React,{useState} from 'react'

import {Button} from '@mui/material'
function BuyBoosterCredits(props) {
  const contract = props.zoombiesContract;
  const [amount, setAmount] = useState('');

  const handleBuyBooster = async (e) => {
    e.preventDefault();
    try{
      await contract.buyBoosterCredits(amount).then((r)=>{
        console.log(`Buy Booster Response: ${r}`);
      });
    }
    catch(err){
      if (err.code === -32603){
        console.log("Insufficient GLMR");
      }
      else if (err.code === "ACTION_REJECTED"){
        console.log("Transaction cancelled");
      }
      else{
        console.log(`Buy Booster Credits Error: ${err.message}`)
      }
    }
  }
  
  return (
    <>
      <Button mt={4} variant="contained" color="success" onClick={()=>{handleBuyBooster()}}>
        Buy Booster Credits
      </Button>
      <input value ={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
    </>
  )
}

export default BuyBoosterCredits