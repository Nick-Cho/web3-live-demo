import Phaser from "phaser";
import star from '../images/star.png'
const distance = 800;
const speed = 0.5;
const stars = [];

const max = 10; //max amount of stars
const x = [];
const y = [];
const z = [];
let screenWidth = 1920;
let screenHeight = 1080;

export default function StarField() {
// console.log("inst");
    if (document.getElementsByClassName("starfield").length > 0) { //prevent multiple starfields
        return;
    }
    window.addEventListener('resize', function(event) {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
      // console.log('resize')
    }, true);
    const config = {
        type: Phaser.AUTO,
        parent: "phase-container",
        width: screenWidth,
        height:screenHeight,
        transparent:true,
        scale: {
          mode: Phaser.Scale.ENVELOP,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: screenWidth,
          height: screenHeight,
        },
        
        scene: {
            preload: preload,
            create: create,
            update: update,
        }
    };

    const game = new Phaser.Game(config);

    function preload() {
        this.load.setBaseURL('https://labs.phaser.io')
        this.load.image('star', 'assets/sprites/star.png')
        // console.log(this.load.image("star",'src/dependencies/images/star.png'))
    }

    function create() {
        for (let i = 0; i < max; i++) {
            stars.push(this.add.sprite(config.width / 2, config.height / 2, "star"));
            x[i] = Math.floor(Math.random() * 800) - 400;
            y[i] = Math.floor(Math.random() * 600) - 300;
            z[i] = Math.floor(Math.random() * 1700) - 100;
        }
    }

    function update() {
        for (let i = 0; i < max; i++) {
            const perspective = distance / (distance - z[i]);
            const starX = (config.width / 2) + x[i] * perspective;
            const starY = (config.height / 2) + y[i] * perspective;

            z[i] += speed;

            if (z[i] > 300) {
                z[i] -= 600;
            }

            stars[i].setPosition(starX, starY);
        }
    }
}