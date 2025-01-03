import * as fs from "fs";
import { EventEmitter } from "events";

export type StickEventType = {
    time: number;
    value: number;
    type: number;
    number: number;
}

class Stick extends EventEmitter {
    private devicePath: string;
    private fd: number | null = null;
    private buffer: Buffer;
    private isReading: boolean = false;

    // Constants for axis mappings (adjust as needed for your device)
    private static readonly LEFT_STICK_X = 0;
    private static readonly LEFT_STICK_Y = 1;
    private static readonly RIGHT_STICK_X = 2;
    private static readonly RIGHT_STICK_Y = 3;

    private leftStick: [number, number] = [0, 0]; // [x, y]
    private rightStick: [number, number] = [0, 0]; // [x, y]

    constructor(devicePath: string) {
        super();
        this.devicePath = devicePath;
        this.buffer = Buffer.alloc(8); // Joystick event structure size is 8 bytes
    }

    private normalize(value: number): number {
        return value / 32767;
    }

    private getEventType(event: StickEventType) {

    }
    private readJoystick(): void {
        if (!this.isReading || this.fd === null) return;

        fs.read(this.fd, this.buffer, 0, 8, null, (err, bytesRead) => {
            if (err) {
                this.emit("error", new Error(`Error reading joystick data: ${err.message}`));
                this.stop();
                return;
            }

            if (bytesRead === 8) {
                const event: StickEventType = {
                    time: this.buffer.readUInt32LE(0),
                    value: this.buffer.readInt16LE(4),
                    type: this.buffer[6],
                    number: this.buffer[7],
                };

                if (event.type === 1) {
                    this.emit("event", { type: "button", number: event.number, value: event.value });
                } else if (event.type === 2) {
                    const normalizedValue = this.normalize(event.value);

                    if (event.number === Stick.LEFT_STICK_X) {
                        this.leftStick[0] = normalizedValue;
                    } else if (event.number === Stick.LEFT_STICK_Y) {
                        this.leftStick[1] = normalizedValue;
                    } else if (event.number === Stick.RIGHT_STICK_X) {
                        this.rightStick[0] = normalizedValue;
                    } else if (event.number === Stick.RIGHT_STICK_Y) {
                        this.rightStick[1] = normalizedValue;
                    }

                    this.emit("event", {
                        type: "axis",
                        leftStick: [...this.leftStick],
                        rightStick: [...this.rightStick],
                    });
                } else {
                    this.emit("event", { type: "other", data: event });
                }
            }
            // Continue reading
            this.readJoystick();
        });
    }

    public start(): void {
        if (this.isReading) {
            this.emit("error", new Error("Stick is already running"));
            return;
        }

        fs.open(this.devicePath, "r", (err, fd) => {
            if (err) {
                this.emit("error", new Error(`Failed to open joystick device at ${this.devicePath}: ${err.message}`));
                return;
            }

            this.fd = fd;
            this.isReading = true;
            this.emit("start");
            this.readJoystick();
        });
    }

    public stop(): void {
        if (!this.isReading) {
            this.emit("error", new Error("Stick is not running"));
            return;
        }

        this.isReading = false;
        if (this.fd !== null) {
            fs.close(this.fd, (err) => {
                if (err) {
                    this.emit("error", new Error(`Error closing joystick device: ${err.message}`));
                }
                this.emit("stop");
            });
            this.fd = null;
        }
    }
}

// Example Usage
const stick = new Stick("/dev/input/js0");
stick.on("event", (event) => console.log(event)); // Handle events
stick.on("error", (err) => console.error(err)); // Handle errors
stick.on("start", () => console.log("Stick started"));
stick.on("stop", () => console.log("Stick stopped"));

stick.start();

setTimeout(() => stick.stop(), 10000);
// To stop reading later
// stick.stop();
