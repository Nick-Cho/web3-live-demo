import React, {useState} from 'react'

import {Button,Snackbar, Alert} from '@mui/material';

function BuyBoosterAndMintNFT(props) {
  const contract = props.zoombiesContract;
  const [openSb, setOpenSb] = useState(false);
  const [sbMsg, setSbMsg] = useState('');
  const [severity, setSeverity] = useState('');
  async function handleBuyandMint() {
    try{
      await contract.buyBoosterAndMintNFT().then((r)=>{
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