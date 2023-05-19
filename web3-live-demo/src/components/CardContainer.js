import React from 'react'
import Card from './Card'
function CardContainer() {
  const images = [
    {
      src: "https://zoombies.world/nft-image/moonbeam/1432",
      rarity: "common",
    },
    
  ]
  return (
    <div>
      {images.map((card)=>{
        return(
          <Card key={card.src} src={card.src} rarity={card.rarity}/>
        )
      })}

    </div>
  )
}

export default CardContainer