import React from 'react'

import {Button} from '@mui/material'

function BuyBoosterAndMintNFT(props) {
  const contract = props.contract;
  async function handleBuyandMint() {
    contract.buyBoosterAndMintNFT();
  }

  return (
    <div>
      <Button variant="contained" color="success" onClick={()=>{handleBuyandMint()}}>
        Buy and Mint Booster NFT
      </Button>
    </div>
  )
}

export default BuyBoosterAndMintNFT