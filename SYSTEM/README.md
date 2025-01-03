# System Overview

The `SYSTEM` folder contains essential configurations, scripts, and setup files required to operate the Hexapod's core system. This system is composed of various interconnected components, each contributing to the Hexapod's functionality and responsiveness.

---

## Components

### 1. **The Brain**
- **Device:** Raspberry Pi
- **Role:**
  - The central processing unit of the Hexapod.
  - Manages communication between the components and executes control scripts.

### 2. **The Body**
- **Description:**
  - The physical Hexapod structure, including its body, legs, and motors.
  - Responsible for locomotion and physical interaction with the environment.

### 3. **The Imp**
- **Device:** Arduino Nano
- **Role:**
  - Communicates with the Raspberry Pi through Firmata protocol
  - Provides access to sensors and screens

### 4. **The Screens**
- **Devices:**
  - E-Ink Display: Provides static or low-refresh-rate feedback (e.g., system status).
  - 6.9 Oled: Displays dynamic information such as real-time sensor readings or control data.

### 5. **Sensors**
- **Camera:** Captures video for object detection and streaming.
- **Infrared:** Detects obstacles and measures proximity.
- **Humidity and Temperature Sensors:** Monitors environmental conditions.
- **Gyroscope:** Tracks orientation and movement stability.

---

## Running Tasks

The system is designed to execute several tasks concurrently, ensuring smooth operation and real-time responsiveness. Below are the primary running tasks:

### 1. **`control.py`**
- **Role:**
  - Listens for movement control commands sent to the Hexapod.
  - Interfaces with the motors via the Hexapod sheld.
- **Location:** `PT/scripts/control.py`

### 2. **`Stick.ts`**
- **Role:**
  - Handles input from the Xbox controller.
  - Converts user commands into actionable data for the Hexapod.
- **Location:** `JS/scripts/Stick.ts`

### 3. **`heartbeat.ts`**
- **Role:**
  - Reads data from the connected sensors (e.g., gyroscope, temperature).
  - Sends periodic status updates to the system and logs sensor readings.
- **Location:** `JS/scripts/heartbeat.ts`

---

## Usage Instructions

1. **Setup:**
   - Ensure all components are connected to the Raspberry Pi as described in the schematics (refer to `DOCS`).
   - Configure the Raspberry Pi environment as outlined in the `README` of the main project directory.

2. **Start the System:**
   - Run the individual scripts or use the provided startup script to initialize all tasks:
     ```bash
     python3 control.py &
     ts-node Stick.ts &
     ts-node heartbeat.ts &
     ```

3. **Monitor System Status:**
   - Use the E-Ink display for a summary of the system's state.
   - Check the mini LCD for dynamic sensor data and movement feedback.

---

## System Checklist

[ ] start xboxdrv (silent)
[ ] start HexaServer.py (main.py) (silent)
[ ] start Stick.ts