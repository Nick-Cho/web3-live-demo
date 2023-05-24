import React from 'react'
import Card from './Card'
function CardContainer() {
  const images = [
    {
      src: "https://zoombies.world/nft-image/moonbeam/79",
      rarity: "holofoil-cross",
    },
    {
      src: "https://zoombies.world/nft-image/moonbeam/1090",
      rarity: "holofoil-star",
    },
  ]
  return (
    <div>
      {images.map((card)=>{
        return(
          <div style={{marginTop:"5rem"}}>
          <Card key={card.src} src={card.src} rarity={card.rarity}/>
          </div>
        )
      })}

    </div>
  )
}

export default CardContainer