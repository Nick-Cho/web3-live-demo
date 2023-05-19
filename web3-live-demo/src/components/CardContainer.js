import React from 'react'
import Card from './Card'
function CardContainer() {
  const images = [
    {
      src: "https://zoombies.world/nft-image/moonbeam/1432",
      rarity: "common",
    },
    {
      src: "https://zoombies.world/nft-image/moonbeam/1090",
      rarity: "common",
    }
  ]
  return (
    <>
      {images.map((card)=>{
        return(
          <Card key={card.src} src={card.src} rarity={card.rarity}/>
        )
      })}

    </>
  )
}

export default CardContainer