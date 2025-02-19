import { CommandName } from "../../../types/commands"

export enum ESocketCommmands {
  CMD_MOVE = "CMD_MOVE",
  CMD_CAMERA = "CMD_CAMERA",
  CMD_RELAX = "CMD_RELAX"
}

/** SUPPORTED SOCKET COMMMANDS
* 
// implemented:
//   CMD_MOVE = "CMD_MOVE"
//   CMD_CAMERA = "CMD_CAMERA"
//   CMD_RELAX = "CMD_RELAX"

//  planned
//   CMD_LED_MOD = "CMD_LED_MOD"
//   CMD_LED = "CMD_LED"
//   CMD_SONIC = "CMD_SONIC"
//   CMD_BUZZER = "CMD_BUZZER"
//   CMD_HEAD = "CMD_HEAD"
//   CMD_BALANCE = "CMD_BALANCE"
//   CMD_ATTITUDE = "CMD_ATTITUDE"
//   CMD_POSITION = "CMD_POSITION"

//   CMD_POWER = "CMD_POWER"
//   CMD_CALIBRATION = "CMD_CALIBRATION"

//   CMD_SERVOPOWER = "CMD_SERVOPOWER"
*/

export type TBaseBridgeProcessor<Name extends CommandName = CommandName, Params = {}> = {
  processCommand: (name: Name, params?: Params)=> void
}