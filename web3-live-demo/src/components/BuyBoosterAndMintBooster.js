import React, {useState} from 'react'

import {useEtherBalance} from '@usedapp/core';
import {formatEther} from '@ethersproject/units';
import { ethers } from 'ethers';

import {Button,Snackbar, Alert} from '@mui/material';

function BuyBoosterAndMintNFT(props) {
  const contract = props.zoombiesContract;
  var balance = useEtherBalance(props.acc);
  balance = balance ? formatEther(balance) : 0
  const [openSb, setOpenSb] = useState(false);
  const [sbMsg, setSbMsg] = useState('');
  const [severity, setSeverity] = useState('');
  async function handleBuyandMint() {
    try{
      await contract.buyBoosterAndMintNFT('0.01',{
        value: ethers.utils.parseEther('0.01').toString(),
      }).then((r)=>{
        console.log(`Response from Buy booster and mint NFT: ${r}`);
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
          setSbMsg(`Buy Booster and Mint NFT Error: ${err.message}`);
          setSeverity("error");
        }
      }
  }
  
  const handleClose = () =>{
    setOpenSb(false);
  }

  return (
    <div>
      <Button  variant="contained" color="success" onClick={()=>{handleBuyandMint()}}>
        Buy and Mint Booster NFT
      </Button>
      <Snackbar open={openSb} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {sbMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default BuyBoosterAndMintNFT