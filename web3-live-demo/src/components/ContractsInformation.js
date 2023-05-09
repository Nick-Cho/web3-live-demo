import React, {useEffect, useState} from 'react'

import Typography from '@mui/material/Typography'

import {ethers,  utils} from 'ethers'
import {Contract} from '@ethersproject/contracts'
import{formatEther} from '@ethersproject/units'

import zoomArtifact from '../dependencies/ZoomToken.json'
import ZoombiesAbi from '../dependencies/Zoombies.json'

function ContractsInformation(props) {
  const chainId = props.chainId
  const acc = props.acc
  let provider = props.provider;
 
  //Address variables from the JSON files
  const moonZoomAddress = '0xE4b80b7D039806efEAc8a6580fbcf2808CaAf9eC';
  let zoomAddress = '';

  //Assigning addresses based on which wallet is selected
  if (chainId == '1287'){
    zoomAddress = moonZoomAddress;
    // provider = new ethers.providers.JsonRpcProvider('https://rpc.api.moonbase.moonbeam.network/');
  }

  //Getting Contracts for total supply
  let zTotalSupply = undefined;
  const [zoomSupply, setZoomSupply] = useState("");
  // const signer = provider.getSigner(acc);
  const ZoomInterface = new utils.Interface(zoomArtifact.abi);
  const contractZoom = new Contract(zoomAddress, ZoomInterface, provider)

  async function getZoomTotalSupply(){
    zTotalSupply = await contractZoom.totalSupply();
    setZoomSupply(formatEther(zTotalSupply.toString()));
  }
  getZoomTotalSupply();
  return (
    <div>
      <br/>
      <Typography color="white" variant="h4">Zoom total Supply:</Typography>
      <p>{zoomSupply}</p>

    </div>
  )
}

export default ContractsInformation