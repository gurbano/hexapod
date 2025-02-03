import { CommandName } from "../../../types/commands";
import { TBaseBridgeProcessor } from "./types";

export class DefaultProcessor implements TBaseBridgeProcessor<any, any>  {
    public processCommand(name: CommandName, params?: any): void  {
        console.log('DefaultProcessor', name, params);
    }
}
