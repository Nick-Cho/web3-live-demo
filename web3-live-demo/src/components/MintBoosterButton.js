import React, {useState} from 'react'

import {Button,Snackbar, Alert} from '@mui/material';
import { formatEther } from 'ethers/lib/utils';

function MintBoosterButton(props) {
  const contract = props.zoombiesContract;
  const acc = props.acc;
  const credits = props.zoombiesCredits;
  const [openSb, setOpenSb] = useState(false);
  const [sbMsg, setSbMsg] = useState('');
  const [severity, setSeverity] = useState('success');
  let creditsOwned = contract ? contract.boosterCreditsOwned(acc) : "";
  
  async function mintBoosterHandler() {
    // console.log(creditsOwned);
    try{
      await contract.mintBoosterNFT(
        0,
        {value: '0'}
        )
        .then(()=>{
          setOpenSb(true);
          setSbMsg('Minted Succesfully');
          setSeverity("success")
      })
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
          setSbMsg(`Mint NFT Error: ${err.message}`);
          setSeverity("error");
        }
      }
  }
  const handleClose = () =>{
    setOpenSb(false);
  }
  return (
    <div style={{justifyContent:"center"}}>
      {!(credits == "" || parseInt(credits) < 1) && <Button  variant = "contained" color="success"  onClick={()=>{mintBoosterHandler()}}>
        Mint Booster NFT
      </Button>}
      <Snackbar open={openSb} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {sbMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default MintBoosterButton