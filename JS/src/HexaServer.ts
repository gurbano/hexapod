import axios from 'axios';
import Stick from './stick';
import { Factory } from './commands';
import { CommandName } from '../types/commands';
import { Bridge } from './bridge/bridge';
import { convertStateToCommands } from './bridge/utils';

// start Python thread

// start JS Server bridge ( command processor)
const bridge = new Bridge();

// start arduino board
    // start oled controller
// start JS input socket
    // process commands
        // print on oled
        // relay to pt socket (calibrate, led, camera, default movements)
/** start xbox controller process */ 
const stick = new Stick("/dev/input/js0", 500);

// listen to status update
stick.on("status", async (event) => {
    // console.log('sending', event);
    // convert xbox event to a command like move forward, look etc
    const commandList = convertStateToCommands(event)
    // console.log(commandList);
    commandList.forEach(async (command) => {
       await bridge.processCommand(command);
    });

}); // Handle events
// stick.on("event", (event) => console.info(event)); // all events
stick.on("error", (err) => console.error(err)); // Handle errors
stick.on("start", () => console.log("Stick started"));
stick.on("stop", () => console.log("Stick stopped"));

stick.start();