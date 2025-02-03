
import { CommandName, CommandType, LookParams, MoveParams, Platform, THexaCommand } from "../types/commands";
import { DefaultProcessor } from "./bridge/processors";
import { LookProcessor, MoveProcessor, SocketRelayProcessor } from "./bridge/processors/SocketProcessor";
import { ESocketCommmands } from "./bridge/processors/types";

// Command configuration object
const commands = {
    [CommandName.MOVE]: {
      type: CommandType.ACTION,
      platform: Platform.HEXA_SHIELD,
      paramType: {} as MoveParams,
      processor: new MoveProcessor(),
    },
    [CommandName.LOOK]: {
      type: CommandType.ACTION,
      platform: Platform.HEXA_SHIELD,
      paramType: {} as LookParams,
      processor: new LookProcessor(),
    },
    [CommandName.RELAX]: {
      type: CommandType.ACTION,
      platform: Platform.HEXA_SHIELD,
      paramType: null as undefined,
      processor: new SocketRelayProcessor(ESocketCommmands.CMD_RELAX),
    },
    // -----------
    [CommandName.TALK]: {
      type: CommandType.ACTION,
      platform: Platform.PI,
      paramType: {} as any,
      processor: new DefaultProcessor(),
    },
  } as const; // `as const` makes this object immutable and enables TypeScript inference
  
  type CommandConfig = typeof commands;
  
  type CommandParamsFromName<Name extends keyof CommandConfig> = CommandConfig[Name]["paramType"];
  
  export const Factory = {
    command<Name extends keyof CommandConfig>(
      name: Name,
      params?: CommandParamsFromName<Name>
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

