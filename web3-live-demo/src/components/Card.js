import React, {useState, useEffect} from 'react'
import '../dependencies/styles/card.css'

function Card({src, rarity}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0});
  const [isHovered, setIsHovered] = useState(false); //keep track of whether card is hovered
  const dampen = 0.025;
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  
  const handleMouseMove = (event) => {
      const { clientX, clientY, target } = event;
      const { left, top, width, height } = target.getBoundingClientRect(); //left = left edge of viewport to left edge of card, top = top edge of viewport to top edge of card

      //mouse position within the card
      const x = (clientX - left) / width; //ranges from 0 to 1
      const y = (clientY - top) / height; //ranges from 0 to 1

      setX(x);
      setY(y);
      //calculate rotation
      const rotationX = (y - 0.5) / dampen; // y - 0.5 to center the rotation (y ranges from -0.5 to 0.5)
      const rotationY = (x - 0.5) / dampen; // x - 0.5 to center the rotation
      
      setRotation({ x: rotationX, y: rotationY });
  }

   //card showcase
    const [showcase, setShowcase] = useState(false);

    function handleOnClick() {
        if (!showcase) { //start showcasing when card clicked
            setShowcase(true);
        }
    }

    useEffect(() => { //stop showcasing when clicked outside of card
        if (!showcase) {
            return;
        }

        function handleDocumentClick() {
            setShowcase(false);
        }

        let timeout = setTimeout(() => { //wait out the transition time before attaching listener
            document.addEventListener("click", handleDocumentClick);
        }, 500);

        return () => {
            clearTimeout(timeout); //for safety
            document.removeEventListener("click", handleDocumentClick);
        }
    }, [showcase]);
  return (
    <div className={"card" + (isHovered ? "" : "") + (showcase ? " showcase enlarged" : "")} 
      id={src}
      onMouseEnter={()=>{setIsHovered(true); document.getElementById(src).style.transition=""} } 
      onMouseMove={handleMouseMove} 
      onMouseLeave={()=>{
        setIsHovered(false);
        setRotation({x:0, y:0});
        document.getElementById(src).style.transition="transform 0.5s ease"
        }}
       onClick={handleOnClick}
      style = {{
          zIndex : isHovered ? 2 : 1, //overlap other cards when hovered (scaling up)
          transform: `perspective(600px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.07 : 1})`
        }} 
      >
      
      <img src={src} alt="Card" className="card-image"/>
      <div className="glare"
      style={{
        transform: isHovered ? `translate(${x*120}px, ${y*170}px) scale(${isHovered ? 1.1 : 1})`: ""
      }} 
      />
    </div>
  )
}

export default Card