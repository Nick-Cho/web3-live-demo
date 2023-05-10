import React from 'react'

import {Button} from '@mui/material';
import { formatEther } from 'ethers/lib/utils';

function MintBoosterButton(props) {
  const contract = props.zoombiesContract;
  const acc = props.acc;
  const credits = props.zoombiesCredits;
  let creditsOwned = contract ? contract.boosterCreditsOwned(acc) : "";
  
  async function mintBoosterHandler() {
    console.log(creditsOwned);
    contract.mintBoosterNFT(0);
  }

  return (
    <div style={{justifyContent:"center"}}>
      {!(credits == "" || parseInt(credits) < 1) && <Button variant = "contained" color="success"  onClick={()=>{mintBoosterHandler()}}>
        Mint Booster NFT
      </Button>}
    </div>
  )
}

export default MintBoosterButton