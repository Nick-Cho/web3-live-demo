import React, {useState} from 'react'
import '../dependencies/styles/card.css'

function Card({src, rarity}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0});
  const [isHovered, setIsHovered] = useState(false); //keep track of whether card is hovered
  const dampen = 0.025;
  const handleMouseMove = (event) => {
      const { clientX, clientY, target } = event;
      const { left, top, width, height } = target.getBoundingClientRect(); //left = left edge of viewport to left edge of card, top = top edge of viewport to top edge of card

      //mouse position within the card
      const x = (clientX - left) / width; //ranges from 0 to 1
      const y = (clientY - top) / height; //ranges from 0 to 1

      //calculate rotation
      const rotationX = (y - 0.5) / dampen; // y - 0.5 to center the rotation (y ranges from -0.5 to 0.5)
      const rotationY = (x - 0.5) / dampen; // x - 0.5 to center the rotation

      setRotation({ x: rotationX, y: rotationY });
  }

  return (
    <div class="card" 
      onMouseEnter={()=>setIsHovered(true)} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={()=>{
        setIsHovered(false);
        setRotation({x:0, y:0});
        }}
      style = {{
          zIndex : isHovered ? 2 : 1, //overlap other cards when hovered (scaling up)
          transform: `perspective(600px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.07 : 1})`
        }} 
      >
      <img src={src} alt="Card" class="card-image"/>
    </div>
  )
}

export default Card