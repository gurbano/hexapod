import { CommandName, GAIT, MODE, THexaCommand } from "../../types/commands";
import { Factory } from "../commands";
import { StickState } from "./Stick";

export class AngleMapper {
    static map(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
        return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
    }

    static calculateAngle(x: number, y: number): number {
        if (x !== 0 || y !== 0) {
            let angle = Math.atan2(x, y) * (180 / Math.PI);

            if (angle < -90 && angle >= -180) {
                angle += 360;
            }

            // if (angle >= -90 && angle <= 90) {
            //     angle = this.map(angle, -90, 90, -10, 10);
            // } else {
            //     angle = this.map(angle, 270, 90, 10, -10);
            // }

            return Math.round(angle);
        }

        return 0; // Default return if x and y are both 0
    }
}

const SENSITIVITY = 0.1;
const enum STICK {
    LEFT = 'LEFT', RIGHT = 'RIGHT'
}
const enum BUTTON {
    A = 0,
    B = 1,
    START = 2,
}
const stickMoved = (state: StickState, stick: STICK) => {
    const stickCoords = (stick == STICK.LEFT) ? state.leftStick : state.rightStick;
    return Math.abs(stickCoords[0]) > SENSITIVITY 
    || Math.abs(stickCoords[1]) > SENSITIVITY;
}
const isPressed = (state: StickState, button: BUTTON) => {
    return !!state.buttons[button];
}
const degrees = (x: number, y: number): number => {
    return AngleMapper.calculateAngle(x,y);
};
export const convertStickStateToCommands = (state: StickState): THexaCommand<any, any>[] => {
    const commandStack = [];
    if (stickMoved(state, STICK.LEFT)) {
        const mode = isPressed(state, BUTTON.B) ? MODE.STRAFE : MODE.ROTATE;
        switch (mode) {
            case MODE.STRAFE:
                commandStack.push(
                    Factory.command(CommandName.MOVE, {
                         x: state.leftStick[0], 
                         y: state.leftStick[1],
                         gait: isPressed(state, BUTTON.A) ? GAIT.WALK : GAIT.RUN,
                         mode: mode,
                         speed: 10,
                         angle: 0
                        }));
                break;
            case MODE.ROTATE:
                const angle = degrees(state.leftStick[0],state.leftStick[1]);
                commandStack.push(
                    Factory.command(CommandName.MOVE, {
                         x: state.leftStick[0], 
                         y: state.leftStick[1],
                         gait: isPressed(state, BUTTON.A) ? GAIT.WALK : GAIT.RUN,
                         mode: mode,
                         speed: 10,
                         angle
                        }));

        }

    } else {
        commandStack.push(
            Factory.command(CommandName.MOVE, {
                 x: 0, 
                 y: 0,
                 gait: GAIT.WALK,
                 mode: MODE.ROTATE,
                 speed: 0,
                 angle: 0,
                }),      
        )
    }
    if (stickMoved(state, STICK.RIGHT)) {
        commandStack.push(
            Factory.command(CommandName.LOOK, { x: state.rightStick[0], y: state.rightStick[1]}),  
        )
    }
    if (isPressed(state, BUTTON.START)) {
        commandStack.push(Factory.command(CommandName.RELAX));
    }
    return commandStack;
}