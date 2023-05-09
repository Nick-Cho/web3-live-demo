import React, {useEffect, useState} from 'react'

import{formatEther} from '@ethersproject/units';
function TransactionsList(props) {
  const zoomContract = props.zoomContract;
  const zoombiesContract = props.zoombiesContract;

  //Arrays for transactions
  const [zoomTrans, setZoomTrans] = useState([]);
  const [zoombiesTrans, setZoombiesTrans] = useState([])

  zoomContract.on("Transfer", (from, to, amount, event)=>{
    // console.log(event);
    const transferBlock = {
      id: event.transactionHash,
      from: from,
      to: to,
      amount: formatEther(amount),
    }
    setZoomTrans((currArr)=>{
      const updatedArr = [transferBlock, ...currArr];
      return updatedArr;
    })
  })

  zoombiesContract.on("Transfer", (from, to, tokenID, event)=>{
    // console.log(event);
    const transferBlock = {
      id: event.transactionHash,
      from: from,
      to: to,
      tokenID: tokenID.toString(),
    }
    setZoombiesTrans((currArr)=>{
      const updatedArr = [transferBlock, ...currArr];
      return updatedArr;
    })
  })

  return (
    <div>TransactionsList</div>
  )
}

export default TransactionsList