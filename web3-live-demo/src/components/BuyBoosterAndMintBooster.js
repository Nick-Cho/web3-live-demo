import React from 'react'

import {useEtherBalance} from '@usedapp/core';
import {formatEther} from '@ethersproject/units';
import { ethers } from 'ethers';

import {Button} from '@mui/material';

function BuyBoosterAndMintNFT(props) {
  const contract = props.contract;
  var balance = useEtherBalance(props.acc);
  balance = balance ? formatEther(balance) : 0
  async function handleBuyandMint() {
    try{
      contract.buyBoosterAndMintNFT({
        value: ethers.utils.parseEther('0.01').toString(),
      }).then((r)=>{
        console.log(`Response from Buy booster and mint NFT: ${r}`);
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
        console.log(`Buy booster and mint error: ${err.message}`);
      }
    };
 }

  return (
    <div>
      <Button  variant="contained" color="success" onClick={()=>{handleBuyandMint()}}>
        Buy and Mint Booster NFT
      </Button>
    </div>
  )
}

export default BuyBoosterAndMintNFT