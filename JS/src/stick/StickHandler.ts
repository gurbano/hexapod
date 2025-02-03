import { Bridge } from "../bridge/bridge";
import Stick from "./Stick";
import { convertStickStateToCommands } from "./utils";

export class StickHandler {
    private stick: Stick;
    private bridge: Bridge;
  
    constructor(bridge: Bridge, stickPath: string, pollInterval: number) {
      this.stick = new Stick(stickPath, pollInterval);
      this.bridge = bridge;
    }
  
    public async handleStickStatus(event: any): Promise<void> {
      const commandList = convertStickStateToCommands(event);
      for (const command of commandList) {
        await this.bridge.processCommand(command);
      }
    }
  
    public start(): void {
      this.stick.on("status", this.handleStickStatus.bind(this));
      // this.stick.on("event", this.handleStickEvent.bind(this));
      this.stick.on("error", (err) => console.error(err)); // Handle errors
      this.stick.on("start", () => console.log("Stick started"));
      this.stick.on("stop", () => console.log("Stick stopped"));
      this.stick.start();
    }
  }