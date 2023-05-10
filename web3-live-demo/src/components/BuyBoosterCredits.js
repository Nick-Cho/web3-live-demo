import React,{useState} from 'react'

import {Button} from '@mui/material'
function BuyBoosterCredits(props) {
  const contract = props.zoombiesContract;
  const [amount, setAmount] = useState('');

  async function handleBuyBooster() {
    contract.buyBoosterCredits(amount);
  }

  
  return (
    <>
      <Button variant = "contained" color="success"  onClick={()=>{handleBuyBooster()}}>
        Buy Booster Credits
      </Button>
      <input value ={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
    </>
  )
}

export default BuyBoosterCredits