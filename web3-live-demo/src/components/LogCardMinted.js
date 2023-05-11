import React, {useState, useEffect} from 'react'

import RedeemIcon from '@mui/icons-material/Redeem';
import RecyclingIcon from '@mui/icons-material/Recycling';
import {Typography,Snackbar, Alert} from '@mui/material'

function LogCardMinted(props) {
  const zoombiesContract = props.zoombiesContract;
  const [lastCardsMinted, setLastCardsMinted] = useState([])
  const [openSb, setOpenSb] = useState(false);
  const [sbMsg, setSbMsg] = useState('');
  const [severity, setSeverity] = useState('success');
  const LogCardMintedListener = async()=>{
    zoombiesContract.on("LogCardMinted", (owner, tokenId, cardTypeId, editionNumber, event)=>{
    // console.log(`Card Minted: ${parseInt(tokenId._hex)}`);
    // setLastCardsMinted(prevArr => [prevArr, tokenId.toString()]);
    // console.log(lastCardsMinted[lastCardsMinted.length-1]);
    // console.log(lastCardsMinted);
    const newEntry ={
      owner: owner,
      id: parseInt(tokenId._hex)
    }
    // if (lastCardsMinted[lastCardsMinted.length-1] != newEntry){
    //   lastCardsMinted.push(newEntry);
    // }
    lastCardsMinted.push(newEntry);
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
    const target = e.target.id;
    try{
      zoombiesContract.sacrificeNFTs([target.toString()]);
    }
    catch(err){
      setOpenSb(true);
      setSbMsg(err.message);
      setSeverity("error");
    }
  }
  const handleClose = () =>{
    setOpenSb(false);
  }
  return (
    <div>
      <Typography color="white" variant="h4">Last Cards Minted:</Typography>
      {/* <div key={17} id={7}>
        <img style={{width:"17rem", height:"20rem"}} alt="" src={`https://zoombies.world/nft-image/moonbeam/17`}/>
        
        <RedeemIcon/>
        <RecyclingIcon id = {17} key={17} onClick={sacrificeHandler}/> 
      </div> */}
      {lastCardsMinted.map((card)=>{
        return(
        <div key={card.id}>
          <img style={{width:"100%", height:"20rem"}} alt="" src={`https://zoombies.world/nft-image/moonbeam/${card.id}`}/>
          { card.owner == props.acc &&(
            <div>
              <RedeemIcon/>
              <RecyclingIcon id = {card.id} key={card.id} onClick={sacrificeHandler}/> 
            </div>)
          }
        </div>
        )
      })}
      <Snackbar open={openSb} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {sbMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default LogCardMinted