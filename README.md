# Hexapod

Hexapod is a collection of custom JavaScript and Python scripts designed to enhance the functionality of the Freenove Hexapod robot and Raspberry Pi. This project also includes system-level configurations and detailed documentation to streamline development and integration.

---

## Project Structure

The project is organized into the following directories:

### 1. **JS**
- Contains TypeScript and JavaScript code to interact with and control the Hexapod.

### 2. **PT**
- Contains Python scripts for additional functionalities and integration.

### 3. **SYSTEM**
- Includes system-level configurations, startup scripts, and other Raspberry Pi-related setup files.

### 4. **DOCS**
- Holds schematics, user guides, and project documentation.

---

## Features

Here is a list of current and planned functionalities:

### ✅ Implemented Features:
- [x] (SYSTEM) - Nano: Enable communication between the Raspberry Pi and Arduino using the Firmata protocol.
- [x] (JS) - Xbox Controller Support: Use an Xbox controller to control the Hexapod.

### 🚧 Planned Features:
- [ ] (SYSTEM)- Startup Script: Automate the initialization of services and scripts on Raspberry Pi boot.
- [ ] (SYSTEM) - 
- [ ] Enhanced Motion Algorithms: Implement more complex gait patterns for smoother movements.
- [ ] Real-time Camera Integration: Stream video and process input for object detection.
- [ ] Sensor Suite Expansion: Add support for additional sensors like ultrasonic and IR.
- [ ] Control UI: Add support for additional sensors like ultrasonic and IR.

---

## Installation

Follow these steps to set up the project:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/hexapod.git
   cd hexapod
   ```

2. **Install Dependencies:**
   - For JavaScript/TypeScript:
     ```bash
     cd JS
     npm install
     ```
   - For Python:
     ```bash
     cd PT
     pip install -r requirements.txt
     ```

3. **Configure the System:**
   - Follow instructions in the `SYSTEM` directory to set up necessary configurations on your Raspberry Pi.

4. **Run Startup Scripts:**
   - Ensure the startup scripts are properly set to execute on boot.

---

## Documentation

Detailed schematics and guides can be found in the `DOCS` directory. These include:
- Circuit diagrams.
- API references for scripts.
- Setup tutorials for the Raspberry Pi and Hexapod.

---

## Contributing

Contributions are welcome! Please follow the steps below:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a detailed description.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Acknowledgments

Special thanks to the Freenove team and the open-source community for their valuable resources and support.
