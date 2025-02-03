import { Bridge } from './bridge/bridge';
import { StickHandler } from './stick/StickHandler';

// start Python thread

// start bridge ( command processor)
const bridge = new Bridge();

// start arduino board
    // start oled controller
// start JS input socket
// start webserver
    // process commands
        // print on oled


/** start xbox controller process */ 
new StickHandler(bridge, "/dev/input/js0", 500).start();
