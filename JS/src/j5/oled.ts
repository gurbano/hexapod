import five from 'johnny-five';
import Oled from 'oled-js';
import font from 'oled-font-5x7';
import pngtolcd from 'png-to-lcd';

const board = new five.Board();
const SCREEN_WIDTH = 128; // Width of the OLED display
const SCREEN_HEIGHT = 64; // Height of the OLED display
const centerX = SCREEN_WIDTH / 2;
const centerY = SCREEN_HEIGHT / 2;
const RADIUS = 15; // Radius of the circle


board.on("ready", () => {
    console.log("Board is ready!");

    // Create an OLED display object for I2C
    const oled = new Oled(board, five,{
        width: SCREEN_WIDTH, // Width of your OLED display
        height: SCREEN_HEIGHT, // Height of your OLED display (32 or 64 depending on your model)
        address: 0x3C, // I2C address (0x3C or 0x3D, depending on your display)
    });

    // Clear the display
    oled.clearDisplay();
    // oled.update();
    
    // oled.update();
    // oled.drawCircle(centerX, centerY, centerY, 0);
    

//   pngtolcd('nyan-cat.png', true, (err, bitmap) => {
//     oled.buffer = bitmap;
//     oled.update();
//   });


const updateDisplay = () => {
    oled.update();
    console.log("OLED updated!");
    oled.fillRect(1, 1, 128, 64, 1);
    oled.writeString(font, 4, `${new Date().getHours()}:${new Date().getMinutes()}`, 0, true, 1);
    setTimeout(updateDisplay, 5000); // Call updateDisplay again after 1 second
  };

  // Start the update loop
  updateDisplay();
});

