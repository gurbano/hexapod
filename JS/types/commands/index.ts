import { TBaseBridgeProcessor } from "../../src/bridge/processors/types";

// These are the commands that can be 
export enum CommandName {
    // socket commands
    MOVE = "MOVE",
    LOOK = "LOOK",
    RELAX = "RELAX",
    
    // esp32 commands
    E32_LED = "E32_LED",

    // raspi commands
    TALK = "TALK",
}

export enum CommandType {
    ACTION = "ACTION",
    QUERY = "QUERY",
    // Add more command types as needed
}

export enum Platform {
    PI = "PI",
    ESP32 = "ESP32",
    HEXA_SHIELD = "HEXA_SHIELD",
}   

export interface THexaCommand<Name extends CommandName, Params> {
  name: Name;
  type: CommandType;
  platform: Platform;
  parameters: Params;
  processor: TBaseBridgeProcessor<Name, Params>;
}

export enum GAIT {
    RUN = 1,
    WALK = 0
}
export enum MODE {
    ROTATE = 1,
    STRAFE = 0
}
export interface MoveParams {
    gait: GAIT; 
    mode: MODE;
    x: number; 
    y: number;
    angle: number;
    speed: number;
}


export interface LookParams {
    x: number;
    y: number;
}