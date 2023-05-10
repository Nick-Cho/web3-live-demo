import React, {useState, useEffect} from 'react'

import {Typography} from '@mui/material'
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
        <div>
          <h1>Test</h1>
          <h1>{tokenId}</h1>
          <img alt="" src={`https://zoombies.world/nft-image/moonbeam/${tokenId}`}/>
        </div>
        )
      })}
    </div>
  )
}

export default LogCardMinted