import React, {useEffect, useState} from 'react';

import TransactionsList from './TransactionsList';
import LogCardMinted from './LogCardMinted';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import {ethers,  providers,  utils} from 'ethers';
import {Contract} from '@ethersproject/contracts';
import{formatEther} from '@ethersproject/units';

import zoomArtifact from '../dependencies/ZoomToken.json';
import zoombiesArtifact from '../dependencies/Zoombies.json';

function ContractsInformation(props) {
  const chainId = props.chainId;
  const acc = props.acc;
  let provider = props.provider;
 
  //Address variables from the JSON files
  const moonBaseZoomAddress = '0xE4b80b7D039806efEAc8a6580fbcf2808CaAf9eC';
  const moonBeamZoomAddress = '0xc46c5cB32a72663C0DB3205f6B444F9c34E216d1';
  const moonBaseZoombiesAddress = '0xB595E4a28540318a802b7847455278C502F30861';
  const moonBeamZoombiesAddress = '0xd6E8A1d5E0675168aF078391Ec3AbD983Eb18EA0';

  let zoomAddress = '';
  let zoombiesAddress = '';

  //Assigning addresses based on which wallet is selected
  if (chainId == '1284') {
    zoomAddress = moonBeamZoomAddress;
    zoombiesAddress = moonBeamZoombiesAddress;
  }
  if (chainId == '1287') {
    zoomAddress = moonBaseZoomAddress;
    zoombiesAddress = moonBaseZoombiesAddress;
  }

  //Getting Contracts for total supply
  let zTotalSupply = undefined;
  let zbTotalSupply = undefined;
  let zbCreditsOwned = undefined;

  const [zoomSupply, setZoomSupply] = useState("");
  const [zoombiesSupply, setZoombiesSupply] = useState("");
  const [zoombiesCredits, setZoombiesCredits] = useState("");

  const signer = provider.getSigner(acc);
  const ZoomInterface = new utils.Interface(zoomArtifact.abi);
  // const ZoombiesInterface = new utils.Interface(zoombiesArtifact);
  let contractZoom = null;
  let contractZoombies = null;
  if (provider){
    contractZoom = new Contract(zoomAddress, ZoomInterface, provider);
  }
  if (signer) {
    contractZoombies = new Contract(zoombiesAddress, zoombiesArtifact.abi, signer);
  }
  
  async function getZoomTotalSupply(){
    zTotalSupply = await contractZoom.totalSupply();
    setZoomSupply(formatEther(zTotalSupply.toString()));
  }

  async function getZoombiesTotalSupply(){
    zbTotalSupply = await contractZoombies.totalSupply();
    zbCreditsOwned = await contractZoombies.boosterCreditsOwned(acc);
    setZoombiesSupply(zbTotalSupply.toString());
    setZoombiesCredits(zbCreditsOwned.toString());
  }

  //LogDailyReward subscription
  contractZoombies.on("LogDailyReward", (owner, amountOfCreditsRemaining)=>{
    console.log("Daily Reward Details: ");
    console.log(`Owner: ${owner}`);
    console.log(`Daily Reward: ${amountOfCreditsRemaining}`);
  })

  //LogPackOpened subscription
  contractZoombies.on("LogPackOpened", (owner, rarity)=>{
    console.log("Log Pack Opened Details: ")
    console.log(`Owner: ${owner}`);
    console.log(`rarity: ${rarity}`);
  })

  return (
    <div>
      <br/>
      <Grid sx={{borderBottom: "2px solid white"}}>
        <div>
          <Typography color="white" variant="h4">Zoom:</Typography>
          <Box mt={2} textAlign="center">
            {!zoomSupply && <Button variant = "contained" color="success" onClick={()=>{getZoomTotalSupply()}}>Get Total Supply</Button>}
          </Box>
          <p>Zoom Total Supply: {zoomSupply}</p>
        </div>
        <div>
          <Typography color="white" variant="h4">Zoombies: </Typography>
          <Box mt={2} textAlign="center">
            {!zoombiesSupply && <Button variant = "contained" color="success" onClick={()=>{getZoombiesTotalSupply()}}>Get Total Supply & Credits Owned</Button>}
          </Box>
          <p>Total Supply: {zoombiesSupply}</p>
          <p>Credits Owned: {zoombiesCredits}</p>
        </div>
      </Grid>
      <Grid mt={2}>
        <TransactionsList chainId={chainId} zoomContract={contractZoom} zoombiesContract={contractZoombies} />
        <LogCardMinted zoombiesContract={contractZoombies}/>
      </Grid>
    </div>
  )
}

export default ContractsInformation