import React, {useState} from 'react'

import RedeemIcon from '@mui/icons-material/Redeem';
import RecyclingIcon from '@mui/icons-material/Recycling';

import {Snackbar, Alert} from '@mui/material'
function Item(props) {
  const id = props.id;
  const [showButtons, setShowButtons] = useState(true);
  const zoombiesContract = props.zoombiesContract;
  const [openSb, setOpenSb] = useState(false);
  const [sbMsg, setSbMsg] = useState('');
  const [severity, setSeverity] = useState('success');
  const [destination, setDestination] = useState('');
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

const giftHandler = async (e) => {
  e.preventDefault();
  // console.log(e)
  const target = e.target.id;
  if (destination == ""){
    setOpenSb(true);
    setSbMsg("Enter a Destination for you gift");
    setSeverity("error");
  } else{
    try{
      // console.log(props.acc);
      // console.log(destination);
      // console.log(target);
      await zoombiesContract["safeTransferFrom(address,address,uint256)"](props.acc, destination, parseInt(target))
      .then(()=>{
        setOpenSb(true);
        setSbMsg("Succesfully Gifted");
        setSeverity("success");
        setShowButtons(false);
        props.lastCardsMinted[e.target.index].owner = parseInt(e.target.id);
      });
      
    } catch (err){
      setOpenSb(true);
      setSbMsg(`Gift Error: ${err.message}`);
      setSeverity("error");
    }
  }
}
const handleClose = () =>{
  setOpenSb(false);
}
  return (
    <div>
      <img style={{width:"100%", height:"20rem"}} alt="" src={`https://zoombies.world/nft-image/moonbeam/${id}`}/>
      {showButtons &&
        <div>
          <input type="text" onChange={(e)=>{setDestination(e.target.value)}} style={{width:"65%"}} placeholder={"Enter Gift Destination"}/>
          <RedeemIcon id={id} onClick={giftHandler}/>
          <RecyclingIcon id={id} key={id} onClick={sacrificeHandler}/> 
        </div>
      }
      <Snackbar open={openSb} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {sbMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Item