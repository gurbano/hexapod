import * as net from "net";
import { CommandName, LookParams, MoveParams } from "../../../types/commands";
import { ESocketCommmands, TBaseBridgeProcessor } from "./types";

const HOST = "spidey.local";
const PORT = 5002;

export abstract class SocketProcessor<N extends CommandName,P> implements TBaseBridgeProcessor<N, P> {
    protected client: net.Socket;
    private isConnected = false;

    constructor() {
        this.client = new net.Socket();
        this.client.connect(PORT, HOST, () => {
            console.log(`Connected to server at ${HOST}:${PORT}`);
            this.isConnected = true;
        });
    }

    protected sendMessage(message: string) {
        if (this.isConnected) {
            this.client.write(message);
            console.log(`Sent: ${message}`);
        } else {
            console.error("Not connected to the server");
        }
    }

    abstract processCommand(name: CommandName, params?: P): void;
    
}

export class SocketRelayProcessor extends SocketProcessor<CommandName, null> {
    private SC: ESocketCommmands;
    constructor(socketCommand: ESocketCommmands) {
        super();
        this.SC = socketCommand;
    }
    processCommand(name: CommandName): void {
        this.sendMessage(this.SC);
     }
}

export class LookProcessor extends SocketProcessor<CommandName.LOOK, LookParams> {
    private static mapValue(x: number): number {
        return Math.floor(180 - 90 * (x + 1));
    }
    public processCommand(name: CommandName, params?: any): void {
        const ptCommand = `CMD_CAMERA#${LookProcessor.mapValue(params.y)}#${LookProcessor.mapValue(params.x)}`;
        super.sendMessage(ptCommand);
    }
}

export class MoveProcessor extends SocketProcessor<CommandName.MOVE, MoveParams> {
    private static mapValueMov(x: number): number {
      return Math.floor(180 - 90 * (x + 1));
    }
    public processCommand(name: CommandName, params?: any): void {
        const {x, y, angle, mode} = params as MoveParams;
        const ptCommand = `CMD_MOVE#${mode}#${Math.floor(x * 50)}#${Math.floor(y  * -50)}#10#${angle}`;
        super.sendMessage(ptCommand);
    }
}

