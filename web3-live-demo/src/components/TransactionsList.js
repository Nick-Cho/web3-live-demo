import React, {useState} from 'react'

import{formatEther} from '@ethersproject/units';

function TransactionsList(props) {
  const zoomContract = props.zoomContract;
  const zoombiesContract = props.zoombiesContract;


  zoomContract.on("Transfer", (from, to, amount, event)=>{
    const transferBlock = {
      id: event.transactionHash,
      from: from,
      to: to,
      amount: formatEther(amount),
    }
    console.log(transferBlock);
    
  })

  zoombiesContract.on("Transfer", (from, to, tokenID, event)=>{
    // console.log(event);
    const transferBlock = {
      id: event.transactionHash,
      from: from,
      to: to,
      tokenID: tokenID.toString(),
    }

    console.log(transferBlock);
  })

  return (
    <div>
    </div>
  )
}

export default TransactionsList