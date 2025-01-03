import axios from 'axios';
import Stick from './controller';

const stick = new Stick("/dev/input/js0");
stick.on("event", async (event) => {
    console.log('sending');
    const response = await axios.post('http://localhost:5000/run', { name: 'TypeScript'})
    console.log(response.status, response.statusText);
}); // Handle events
stick.on("error", (err) => console.error(err)); // Handle errors
stick.on("start", () => console.log("Stick started"));
stick.on("stop", () => console.log("Stick stopped"));


stick.start();