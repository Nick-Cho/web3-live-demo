import React, {useState, useEffect} from 'react'

import RedeemIcon from '@mui/icons-material/Redeem';
import {Typography,Grid} from '@mui/material'

function LogCardMinted(props) {
  const zoombiesContract = props.zoombiesContract;
  const [lastCardsMinted, setLastCardsMinted] = useState([])

  zoombiesContract.on("LogCardMinted", (owner, tokenId, cardTypeId, editionNumber, event)=>{
    // console.log(`Card Minted: ${parseInt(tokenId._hex)}`);
    // setLastCardsMinted(prevArr => [prevArr, tokenId.toString()]);
    console.log(lastCardsMinted[lastCardsMinted.length-1]);
    if (lastCardsMinted[lastCardsMinted.length-1] != parseInt(tokenId._hex)){
      lastCardsMinted.push(parseInt(tokenId._hex));
    }
    // console.log(`lastCardsMinted: ${lastCardsMinted}`)
  })
  
  return (
    <div>
      <Typography color="white" variant="h4">Last Cards Minted:</Typography>
      
      {lastCardsMinted.map((tokenId)=>{
        return(
        <Grid flexDirection={"row"} key={tokenId}>
          <img style={{width:"17rem", height:"20rem"}} alt="" src={`https://zoombies.world/nft-image/moonbeam/${tokenId}`}/>
          <RedeemIcon/>
        </Grid>
        )
      })}
    </div>
  )
}

export default LogCardMinted