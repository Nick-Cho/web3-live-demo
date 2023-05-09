import React, {useEffect, useState} from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import {ethers,  providers,  utils} from 'ethers'
import {Contract} from '@ethersproject/contracts'
import{formatEther} from '@ethersproject/units'

import zoomArtifact from '../dependencies/ZoomToken.json'
import ZoombiesAbi from '../dependencies/Zoombies.json'

function ContractsInformation(props) {
  const chainId = props.chainId
  const acc = props.acc
  let provider = props.provider;
 
  //Address variables from the JSON files
  const moonBaseZoomAddress = '0xE4b80b7D039806efEAc8a6580fbcf2808CaAf9eC';
  const moonBeamZoomAddress = '0xd6E8A1d5E0675168aF078391Ec3AbD983Eb18EA0';

  let zoomAddress = '';
  let zoombiesAddress = '';

  //Assigning addresses based on which wallet is selected
  if (chainId == '1284') zoomAddress = moonBeamZoomAddress;
  if (chainId == '1287') zoomAddress = moonBaseZoomAddress;

  //Getting Contracts for total supply
  let zTotalSupply = undefined;
  const [zoomSupply, setZoomSupply] = useState("");
  // const signer = provider.getSigner(acc);
  const ZoomInterface = new utils.Interface(zoomArtifact.abi);
  let contractZoom = null;
  if (provider){
    contractZoom = new Contract(zoomAddress, ZoomInterface, provider);
  }
  async function getZoomTotalSupply(){
    zTotalSupply = await contractZoom.totalSupply();
    setZoomSupply(formatEther(zTotalSupply.toString()));
  }

  return (
    <div>
      <br/>
      <Typography color="white" variant="h4">Zoom total Supply:</Typography>
      <Box mt={2} textAlign="center">
        {!zoomSupply && <Button variant = "contained" color="success" onClick={()=>{getZoomTotalSupply()}}>Get Total Supply</Button>}
      </Box>
      <p>{zoomSupply}</p>

    </div>
  )
}

export default ContractsInformation