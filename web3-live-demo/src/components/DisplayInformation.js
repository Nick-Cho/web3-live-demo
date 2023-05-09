import React from 'react'
import { formatEther } from '@ethersproject/units'

import Typography from '@mui/material/Typography'
function DisplayInformation (props) {
  const balance = props.balance
  const blkChainName = new Map ([
    [1, "Ethereum"],
    [1287, "Moonbase Alpha"]
  ])
  return (
    <>
      {balance && props.acc && (
        <div className="balance">
          <br />
          <Typography color="white" variant="h4">Blockchain Name: </Typography>
          <p>{blkChainName.get(props.id)}</p>

          <Typography color="white" variant="h4">Chain ID: </Typography>
          <p>{props.id}</p>
          
          <Typography color="white" variant="h4">Block Number:</Typography>
          <p>{props.blk.blockNumber}</p>  
          
          <Typography color="white" variant="h4">Wallet Address:</Typography>
          <p className="bold">{props.acc}</p>
          
          <Typography color="white" variant="h4">Wallet Balance (Ether):</Typography>
          <p className="bold">{formatEther(balance)}</p>
          
          <Typography color="white" variant="h4">Wallet Balance (Wei):</Typography>
          <p>{formatEther(balance)** 10}</p>
        </div>
      )}
    </>
  )
}

export default DisplayInformation