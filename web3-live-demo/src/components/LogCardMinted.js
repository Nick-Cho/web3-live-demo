import React, {useState} from 'react'

function LogCardMinted(props) {
  const zoombiesContract = props.zoombiesContract;
  const [lastCardsMinted, setLastCardsMinted] = useState([])

  zoombiesContract.on("LogCardMinted", (owner, tokenId, cardTypeId, editionNumber, event)=>{
    // console.log(tokenId);
    setLastCardsMinted(prevArr => [prevArr, tokenId.toString()])
  })
  
  return (
    <div>
      {lastCardsMinted.map((card)=>{
        return(
        <div key = {card}>
          <p>{card}</p>
        </div>
        )
      })}
    </div>
  )
}

export default LogCardMinted