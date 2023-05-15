import React, {useEffect} from 'react'

import {Typography} from '@mui/material'

import Item from './Item'
function LogCardMinted(props) {
  const zoombiesContract = props.zoombiesContract;
  const spineRef = props.spineRef;
  const lastCardsMinted = [];

  const LogCardMintedListener = async()=>{
    zoombiesContract.on("LogCardMinted", (owner, tokenId, cardTypeId, editionNumber, event)=>{
    const newEntry ={
      owner: owner,
      id: parseInt(tokenId._hex)
    }
    lastCardsMinted.push(newEntry);
    spineRef.animationState.setAnimation(0,"run", true);
    setTimeout(() => {
      spineRef.animationState.setAnimation(0,"idle", true);
    }, 1000);
    // console.log(`lastCardsMinted: ${lastCardsMinted}`)
  })}
  
  useEffect(()=>{
    LogCardMintedListener();
    return () => {
      zoombiesContract.removeAllListeners();
    }
  },[zoombiesContract]);

  return (
    <div>
      <Typography color="white" variant="h4">Last Cards Minted:</Typography>
      {lastCardsMinted.map((card)=>{
        return(
        <div key={card.id}>
          <Item zoombiesContract={zoombiesContract} acc={props.acc} id={card.id}/>
        </div>
        )
      })}
      
    </div>
  )
}

export default LogCardMinted