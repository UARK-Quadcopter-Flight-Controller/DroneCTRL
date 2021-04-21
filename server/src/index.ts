import dotenv from 'dotenv';
import express from 'express';
import Drone, { instance } from './Drone';


dotenv.config();
process.env.LOG_LEVEL = 'Info';
let MockDrone = new Drone();

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
            Bt: MockDrone.getTemperature(),
            Bp: MockDrone.getPressure(),
            Ba: MockDrone.getAltitude(),
            Mh: MockDrone.getHeading(),
            La: latitude,
            Lo: longitude
        }
    });
});

app.post('/fly', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        status:  true
    });
});

app.post('/seed', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Create a new Mock Drone instance to "reset" for a demo
    MockDrone = new Drone();

    // Get the location data from the phone to initially make the drone in a close prox to the phone
    let payload = req.body.payload;
    console.log(payload)
    MockDrone.setGPS(payload.coords.latitude, payload.coords.longitude);
    MockDrone.setPressure(Drone.getPressureFromAltitude(payload.coords.altitude))
    res.send({
        status:  true
    });
});


app.listen(PORT, () => console.log(`App is alive at http://localhost:${PORT}`));