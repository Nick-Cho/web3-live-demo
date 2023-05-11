import React from 'react'
import { formatEther } from '@ethersproject/units'
import { ethers } from 'ethers'
import Typography from '@mui/material/Typography'
function DisplayInformation (props) {
  const balance = props.balance
  const blkChainName = new Map ([
    [1, "Ethereum"],
    [1287, "Moonbase Alpha"],
    [1284, 'Moonbeam']
  ])
  return (
    <>
      {balance && props.acc && (
        <div className="balance">
          <br />
          <Typography color="white" variant="h4">Blockchain Name: </Typography>
          <p>{blkChainName.get(props.chainId)}</p>

          <Typography color="white" variant="h4">Chain ID: </Typography>
          <p>{props.chainId}</p>
          
          <Typography color="white" variant="h4">Block Number:</Typography>
          <p>{props.blk.blockNumber}</p>  
          
          <Typography color="white" variant="h4">Wallet Address:</Typography>
          <p className="bold">{props.acc}</p>
     
          <Typography color="white" variant="h4">Wallet Balance (Ether):</Typography>
          <p className="bold">{formatEther(balance)}</p>
          
          <Typography color="white" variant="h4">Wallet Balance (Wei):</Typography>
          <p>{ethers.utils.parseEther((parseInt(balance)).toString()).toString()}</p>
        </div>
      )}
    </>
  )
}

export default DisplayInformation