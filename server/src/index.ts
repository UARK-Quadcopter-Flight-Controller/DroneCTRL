import Logger from '@zackheil/lambda-logger';
import dotenv from 'dotenv';
import express from 'express';
import Drone, { instance } from './Drone';

const map = (input: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
    return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

dotenv.config();
process.env.LOG_LEVEL = 'Info';
const logger = new Logger();
let MockDrone = new Drone(logger);

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.get('/status', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ status: true }));
});

app.get('/getData', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Retrieve values from the mock drone instance
    const { Ax, Ay, Az } = MockDrone.getAccelerometer();
    const { Gx, Gy, Gz } = MockDrone.getGyroscope();
    const { latitude, longitude } = MockDrone.getGPS();

    res.send({
        data: {
            Ax: Ax,
            Ay: Ay,
            Az: Az,
            Gx: Gx,
            Gy: Gy,
            Gz: Gz,
            La: latitude,
            Lo: longitude,
            Bt: MockDrone.getTemperature(),
            Bp: MockDrone.getPressure(),
            Ba: MockDrone.getAltitude(),
            Mh: MockDrone.getHeading(),
            Db: MockDrone.getBattery(),
            Dr: MockDrone.getRSSI()
        }
    });
});

app.post('/fly', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let payload = req.body.payload;
    // console.log(Date.now(), "test:", payload)

    // Left stick actions
    if(payload.altStick.x !== 0) {
        const heading = MockDrone.getHeading();
        MockDrone.setHeading(heading + map(payload.altStick.x, -100, 100, -0.5, 0.5))
    }
    if(payload.altStick.y !== 0) {
        const alt = MockDrone.getAltitude();
        MockDrone.setAltitude(alt + map(payload.altStick.y, -100, 100, -0.5, 0.5))
    }

    // Right stick actions
    if(payload.dirStick.x !== 0 || payload.dirStick.y !== 0 ) {
        const { latitude, longitude } = MockDrone.getGPS();
        MockDrone.setGPS(latitude + map(payload.dirStick.y, -100, 100, -0.000005, 0.000005), 
                        longitude + map(payload.dirStick.x, -100, 100, -0.000005, 0.000005))
    }

    res.send({
        status:  true
    });
});

app.post('/seed', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Create a new Mock Drone instance to "reset" for a demo
    MockDrone = new Drone(logger);

    // Get the location data from the phone to initially make the drone in a close prox to the phone
    let payload = req.body.payload;
    MockDrone.setGPS(payload.coords.latitude, payload.coords.longitude);
    MockDrone.setAbsoluteAltitude(payload.coords.altitude);

    res.send({ status: true });
});


app.listen(PORT, () => console.log(`App is alive at http://localhost:${PORT}`));