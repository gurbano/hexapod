
import { CommandName, CommandType, LookParams, MoveParams, Platform, THexaCommand } from "../types/commands";
import { defaultProcessor, bridgeProcessor } from "./bridge/processors";

// Command configuration object
const commands = {
    [CommandName.MOVE]: {
      type: CommandType.ACTION,
      platform: Platform.PI,
      paramType: {} as MoveParams, // Use a type assertion to define the parameter type
      processor: bridgeProcessor,
    },
    [CommandName.LOOK]: {
      type: CommandType.ACTION,
      platform: Platform.PI,
      paramType: {} as LookParams, // Use a type assertion to define the parameter type
      processor: bridgeProcessor,
    },
  } as const; // `as const` makes this object immutable and enables TypeScript inference
  
  // Helper type to infer parameters from the commands object
  type CommandConfig = typeof commands;
  
  type CommandParamsFromName<Name extends keyof CommandConfig> = CommandConfig[Name]["paramType"];
  
  export const Factory = {
    command<Name extends keyof CommandConfig>(
      name: Name,
      params: CommandParamsFromName<Name>
    ): THexaCommand<Name, CommandParamsFromName<Name>> {
      const { type, platform, processor } = commands[name];
  
      return {
        name,
        type,
        platform,
        parameters: params,
        processor,
      };
    },
  };
  