import React,{useState, useEffect} from 'react'

import { ethers } from 'ethers';

import {Button,Snackbar, Alert} from '@mui/material'

function BuyBoosterCredits(props) {
  const contract = props.zoombiesContract;
  const [amount, setAmount] = useState('');
  const [openSb, setOpenSb] = useState(false);
  const [sbMsg, setSbMsg] = useState('');
  const [severity, setSeverity] = useState('success');
  const [disabled,setDisabled] = useState(false);
  const handleBuyBooster = async () => {
    if (amount === '' || amount === "0"){
      //User needs to enter amount they want to buy
      setOpenSb(true);
      setSbMsg('Input valid amount of Booster Credits to be purchased');
      setSeverity("error");
    }
    else {
      try{
        await contract.buyBoosterCredits(
          parseInt(amount),
          {value: ethers.utils.parseEther((parseInt(amount)).toString()).toString()} // Wei converted Ether
        )
        .then((r)=>{
          setOpenSb(true);
          setSeverity("sucess");
          setSbMsg('Purchased successfuly');
        });
      }
      catch(err){
        if (err.code === -32603){
          // console.log("Insufficient GLMR");
          setOpenSb(true);
          setSbMsg('Insufficient GLMR');
          setSeverity("error");
        }
        else if (err.code === "ACTION_REJECTED"){
          // console.log("Transaction cancelled");
          setOpenSb(true);
          setSbMsg('Transaction Cancelled');
          setSeverity("error");
        }
        else{
          setOpenSb(true);
          setSbMsg(`Buy Booster Credits Error: ${err.message}`);
          setSeverity("error");
        }
      }
    }
  }

  const handleClose = () =>{
    setOpenSb(false);
  }

  useEffect(()=>{
    if (props.creds == '0'){
      setDisabled(true);
    }
  },[props.creds])

  return (
    <>
      <Button disabled={disabled} mt={4} variant="contained" color="success" onClick={()=>{handleBuyBooster()}}>
        Buy Booster Credits
      </Button>
      <input value ={amount} type="number" min="0" onChange={(e)=>{setAmount(e.target.value)}}/>
      <Snackbar open={openSb} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {sbMsg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default BuyBoosterCredits