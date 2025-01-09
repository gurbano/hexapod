// bridge that converts and sends commands to python socket
import { CommandName, CommandType, Platform, THexaCommand } from '../../types/commands'; // Adjust the import path as necessary

export class Bridge {
  // Method to process a THexaCommand
  async processCommand<Name extends CommandName, Params>(
    command: THexaCommand<Name, Params>,
  ): Promise<String> {
    // Placeholder for command processing logic
    console.log(new Date());
    // console.log(`Processing command: ${command.name}`);
    // console.log(`Command type: ${command.type}`);
    // console.log(`Platform: ${command.platform}`);
    // console.log(`Parameters:`, command.parameters);

    // Add your command handling logic here
    await command.processor(command.name, command.parameters);
    return 'OK';
  }
}
