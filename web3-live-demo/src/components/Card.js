import React, {useState} from 'react'
import '../dependencies/styles/card.css'

function Card({src, rarity}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0});
  const [isHovered, setIsHovered] = useState(false); //keep track of whether card is hovered
  const dampen = 0.025;
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  const root = document.documentElement;
    
  const handleMouseMove = (event) => {
      const { clientX, clientY, target } = event;
      const { left, top, width, height } = target.getBoundingClientRect(); //left = left edge of viewport to left edge of card, top = top edge of viewport to top edge of card

      //mouse position within the card
      const x = (clientX - left) / width; //ranges from 0 to 1
      const y = (clientY - top) / height; //ranges from 0 to 1
      
      var px = Math.abs(Math.floor(100 / width * clientX)-100);
      var py = Math.abs(Math.floor(100 / height * clientY)-100);
      var lp = (60+(px - 50)/1.1)+10;
      var tp = (60+(py - 50)/1.1)+10;
      var px_spark = (60+(px - 30)/6);
      var py_spark = (50+(py - 30)/6);
      root.style.setProperty("--glr_xpos", `${lp}%`);
      root.style.setProperty("--glr_ypos", `${tp}%`)
      root.style.setProperty("--sparkle_xpos", `${px_spark}%`);
      root.style.setProperty("--sparkle_ypos", `${py_spark}%`)
      setX(x);
      setY(y);

      //calculate rotation
      const rotationX = (y - 0.5) / dampen; // y - 0.5 to center the rotation (y ranges from -0.5 to 0.5)
      const rotationY = (x - 0.5) / dampen; // x - 0.5 to center the rotation
      
      setRotation({ x: rotationX, y: rotationY });
  }

   //card showcase
    const [showcase, setShowcase] = useState(false);
    
  return (
    <div >
      <div className="card animated" 
        id={src}
        onMouseEnter={()=>{setIsHovered(true); document.getElementById(src).style.transition="transform 0.1s ease"} } 
        onMouseMove={handleMouseMove} 
        onMouseLeave={()=>{
          setIsHovered(false);
          setRotation({x:0, y:0});
          document.getElementById(src).style.transition="transform 0.5s ease"
          }}
        onClick={()=>setShowcase(!showcase)}
        style = {{
          zIndex : isHovered ? 2 : 1, //overlap other cards when hovered (scaling up)
          transform: `perspective(600px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.07 : 1})`, 
          backgroundPosition: `${x}% ${y}% `
        }} 
        >
        
        {/* <img src={src} alt="Card" className="card-image"/> */}
        <div className="glare"
        style={{
          transform: isHovered ? `translate(${x*90}px, ${y*170}px) scale(${isHovered ? 1.1 : 1})`: "",
        }} 
        />
      </div>
    </div>
  )
}

export default Card