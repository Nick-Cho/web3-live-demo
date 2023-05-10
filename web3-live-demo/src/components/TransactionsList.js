import React, {useState} from 'react'

import{formatEther} from '@ethersproject/units';

function TransactionsList(props) {
  const zoomContract = props.zoomContract;
  const zoombiesContract = props.zoombiesContract;

  //Arrays for transactions
  const [zoomTrans, setZoomTrans] = useState([]);
  const [zoombiesTrans, setZoombiesTrans] = useState([])

  zoomContract.on("Transfer", (from, to, amount, event)=>{
    const transferBlock = {
      id: event.transactionHash,
      from: from,
      to: to,
      amount: formatEther(amount),
    }
    console.log(transferBlock);
    setZoomTrans(prevArr => [...prevArr, transferBlock]);
    
  })

  zoombiesContract.on("Transfer", (from, to, tokenID, event)=>{
    // console.log(event);
    const transferBlock = {
      id: event.transactionHash,
      from: from,
      to: to,
      tokenID: tokenID.toString(),
    }
    setZoombiesTrans(prevArr => [...prevArr, transferBlock])
    // console.log(zoombiesTrans);
  })

  return (
    <div>
      {/* {zoomTrans.map((transfer)=>{
        return(
          <div key = {transfer.id}>
            <p>{transfer.tokenID}</p>
          </div>
        )
      })} */}
    </div>
  )
}

export default TransactionsList