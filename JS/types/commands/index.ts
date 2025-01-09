// Enums for command properties
export enum CommandName {
    MOVE = "MOVE",
    LOOK = "LOOK",
    // Add more command names as needed
}

export enum CommandType {
    ACTION = "ACTION",
    QUERY = "QUERY",
    // Add more command types as needed
}

export enum Platform {
    PI = "PI",
    NANO = "NANO"
}

export interface THexaCommand<Name extends CommandName, Params> {
  name: Name;
  type: CommandType;
  platform: Platform;
  parameters: Params;
  processor: (name: Name, params: Params ) => Promise<void>
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
    gait: GAIT; // Example: "walk" or "run"
    mode: MODE; // Speed in units
    x: number; // X-coordinate
    y: number; // Y-coordinate
    speed: number;
}


export interface LookParams {
    x: number; // X-coordinate
    y: number; // Y-coordinate
}