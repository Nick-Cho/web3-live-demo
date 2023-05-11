import React, {useState, useEffect} from 'react'

import RedeemIcon from '@mui/icons-material/Redeem';
import RecyclingIcon from '@mui/icons-material/Recycling';
import {Typography,Grid,Box} from '@mui/material'

function LogCardMinted(props) {
  const zoombiesContract = props.zoombiesContract;
  const [lastCardsMinted, setLastCardsMinted] = useState([])

  const LogCardMintedListener = async()=>{
    zoombiesContract.on("LogCardMinted", (owner, tokenId, cardTypeId, editionNumber, event)=>{
    // console.log(`Card Minted: ${parseInt(tokenId._hex)}`);
    // setLastCardsMinted(prevArr => [prevArr, tokenId.toString()]);
    console.log(lastCardsMinted[lastCardsMinted.length-1]);
    if (lastCardsMinted[lastCardsMinted.length-1] != parseInt(tokenId._hex)){
      lastCardsMinted.push(parseInt(tokenId._hex));
    }
    // console.log(`lastCardsMinted: ${lastCardsMinted}`)
  })}
  
  useEffect(()=>{
    LogCardMintedListener();
    return() => {
      zoombiesContract.removeAllListeners();
    }
  },[zoombiesContract])

  const sacrificeHandler = (e) => {
    e.preventDefault();

  }
  return (
    <div>
      <Typography color="white" variant="h4">Last Cards Minted:</Typography>
      <Grid  flexDirection={"column"}>
        <img style={{width:"17rem", height:"20rem"}} alt="" src={`https://zoombies.world/nft-image/moonbeam/17`}/>
        <Box >
            <RedeemIcon/>
            <RecyclingIcon onClick={sacrificeHandler}/>
        </Box>
      </Grid>
      {lastCardsMinted.map((tokenId)=>{
        return(
        <Grid key={tokenId}>
          <img style={{width:"17rem", height:"20rem"}} alt="" src={`https://zoombies.world/nft-image/moonbeam/17`}/>
          <RedeemIcon/>
        </Grid>
        )
      })}
    </div>
  )
}

export default LogCardMinted