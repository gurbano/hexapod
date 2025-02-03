// bridge that converts and sends commands to python socket
import { CommandName, CommandType, Platform, THexaCommand } from '../../types/commands'; 

export class Bridge {
  // Method to process a THexaCommand
  async processCommand<Name extends CommandName, Params>(
    command: THexaCommand<Name, Params>,
  ): Promise<String> {
   
    // console.log(`Processing command: ${command.name}`);
    // console.log(`Command type: ${command.type}`);
    // console.log(`Platform: ${command.platform}`);
    // console.log(`Parameters:`, command.parameters);
    await command.processor.processCommand(command.name, command.parameters);
    return 'OK';
  }
}
