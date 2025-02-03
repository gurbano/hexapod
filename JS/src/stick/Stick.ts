import * as fs from "fs/promises"; // Use promises API
import { EventEmitter } from "events";

export type StickEventType = {
    time: number;
    value: number;
    type: number;
    number: number;
};

export type StickState = {
    leftStick: [number, number];
    rightStick: [number, number];
    buttons: Record<number, boolean>; // Map of button numbers to their pressed state
};

export default class Stick extends EventEmitter {
    private devicePath: string;
    private fd: fs.FileHandle | null = null;
    private buffer: Buffer;
    private isReading: boolean = false;
    private readInterval: number = 1000 / 60; // Default to 60 times per second

    // Constants for axis mappings (adjust as needed for your device)
    private static readonly LEFT_STICK_X = 0;
    private static readonly LEFT_STICK_Y = 1;
    private static readonly RIGHT_STICK_X = 2;
    private static readonly RIGHT_STICK_Y = 3;

    private state: StickState = {
        leftStick: [0, 0],
        rightStick: [0, 0],
        buttons: {},
    };

    constructor(devicePath: string, readFrequency: number = 60) {
        super();
        this.devicePath = devicePath;
        this.buffer = Buffer.alloc(8); // Joystick event structure size is 8 bytes
        this.readInterval = 1000 / readFrequency; // Calculate interval from frequency
    }

    private normalize(value: number): number {
        return value / 32767;
    }

    private async readJoystick(): Promise<void> {
        if (!this.isReading || this.fd === null) return;

        try {
            const { bytesRead } = await this.fd.read(this.buffer, 0, 8, null);

            if (bytesRead === 8) {
                const event: StickEventType = {
                    time: this.buffer.readUInt32LE(0),
                    value: this.buffer.readInt16LE(4),
                    type: this.buffer[6],
                    number: this.buffer[7],
                };

                if (event.type === 1) { // Button event
                    this.state.buttons[event.number] = event.value === 1;
                    this.emit("event", { type: "button", number: event.number, value: event.value });
                } else if (event.type === 2) { // Axis event
                    const normalizedValue = this.normalize(event.value);

                    if (event.number === Stick.LEFT_STICK_X) {
                        this.state.leftStick[0] = normalizedValue;
                    } else if (event.number === Stick.LEFT_STICK_Y) {
                        this.state.leftStick[1] = normalizedValue;
                    } else if (event.number === Stick.RIGHT_STICK_X) {
                        this.state.rightStick[0] = normalizedValue;
                    } else if (event.number === Stick.RIGHT_STICK_Y) {
                        this.state.rightStick[1] = normalizedValue;
                    }

                    this.emit("event", {
                        type: "axis",
                        state: this.state,
                    });
                } else {
                    this.emit("event", { type: "other", data: event });
                }
            }

            // // Emit the current state after processing the event
            // this.emit("status", this.state);

            // Schedule next read
            if (this.isReading) {
                setTimeout(() => this.readJoystick(), this.readInterval);
            }
        } catch (err) {
            this.emit("error", new Error(`Error reading joystick data: ${err.message}`));
            this.stop();
        }
    }

    private emitStatus = async () => {
            this.emit("status", this.state);
            if (this.isReading) {
                setTimeout(() => this.emitStatus(), 1000/60);
            }
    }

    public async start(): Promise<void> {
        if (this.isReading) {
            this.emit("error", new Error("Stick is already running"));
            return;
        }

        try {
            this.fd = await fs.open(this.devicePath, "r");
            this.isReading = true;
            this.emit("start");
            await this.emitStatus();
            await this.readJoystick();
        } catch (err) {
            this.emit("error", new Error(`Failed to open joystick device at ${this.devicePath}: ${err.message}`));
        }
    }

    public async stop(): Promise<void> {
        if (!this.isReading) {
            this.emit("error", new Error("Stick is not running"));
            return;
        }

        this.isReading = false;
        if (this.fd !== null) {
            try {
                await this.fd.close();
                this.emit("stop");
            } catch (err) {
                this.emit("error", new Error(`Error closing joystick device: ${err.message}`));
            } finally {
                this.fd = null;
            }
        }
    }
}
