import axios from "axios";
import * as net from "net";
import { CommandName, MODE, MoveParams } from "../../types/commands";

export const defaultProcessor = async (name, params) => {
    // console.log(`def  processor - ${name} `);
};
const client = new net.Socket();
const HOST = "spidey.local";
const PORT = 5002;

client.connect(PORT, HOST, () => {
    console.log(`Connected to server at ${HOST}:${PORT}`);
    const message = "Hello, Python Server!";
    client.write(message);
    console.log(`Sent: ${message}`);
});

function mapValue(x: number): number {
    return Math.floor(180 - 90 * (x + 1));
}
function mapValueMov(x: number): number {
    return Math.floor(180 - 90 * (x + 1));
}


export const bridgeProcessor = async (name: CommandName, params) => {
  console.log(`sending command to PT - ${name} ${JSON.stringify(params)}`);
  
  let ptCommand = '';
  switch (name){
    case CommandName.LOOK:
        ptCommand = `CMD_CAMERA#${mapValue(params.y)}#${mapValue(params.x)}`;
        break;

    case CommandName.MOVE:
        const {x, y, gait, mode} = params as MoveParams;
        ptCommand = `CMD_MOVE#1#${Math.floor(x * 50)}#${Math.floor(y  * -50)}#10#${mode == MODE.STRAFE ? 0 : 1}`;
        break;
    default:
        return;
  }
  console.log(`Converted to - ${JSON.stringify(ptCommand)}`);
  try {

    client.write(ptCommand);
    client.write('');
  } catch(err) {
    console.error(`Error: ${err.message}`);
  }
  
  // console.log(response.status, response.statusText);

};