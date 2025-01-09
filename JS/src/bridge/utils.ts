import { CommandName, GAIT, MODE, THexaCommand } from "../../types/commands";
import { Factory } from "../commands";
import { StickState } from "../stick";

const SENSITIVITY = 0.1;
const enum STICK {
    LEFT = 'LEFT', RIGHT = 'RIGHT'
}
const enum BUTTON {
    A = 0,
    B = 1
}
const stickMoved = (state: StickState, stick: STICK) => {
    const stickCoords = (stick == STICK.LEFT) ? state.leftStick : state.rightStick;
    return Math.abs(stickCoords[0]) > SENSITIVITY 
    || Math.abs(stickCoords[1]) > SENSITIVITY;
}
const isPressed = (state: StickState, button: BUTTON) => {
    return !!state.buttons[button];
}
export const convertStateToCommands = (state: StickState): THexaCommand<any, any>[] => {
    const commandStack = [];
    if (stickMoved(state, STICK.LEFT)) {
        commandStack.push(
            Factory.command(CommandName.MOVE, {
                 x: state.leftStick[0], 
                 y: state.leftStick[1],
                 gait: isPressed(state, BUTTON.A) ? GAIT.WALK : GAIT.RUN,
                 mode: isPressed(state, BUTTON.B) ? MODE.STRAFE : MODE.ROTATE,
                 speed: 10,
                }),      
        )
    }
    if (stickMoved(state, STICK.RIGHT)) {
        commandStack.push(
            Factory.command(CommandName.LOOK, { x: state.rightStick[0], y: state.rightStick[1]}),  
        )
    }
    return commandStack;
}