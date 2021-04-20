import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.get('/status', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ status: true }));
});

app.get('/getData', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        data: {
            Ax: 0.0,
            Ay: 0.0,
            Az: 0.0,
            Gx: 0.0,
            Gy: 0.0,
            Gz: 1.0,
            Bt: 20.3,
            Bp: 100000.0,
            Ba: 250,
            Mh: 210,
            La: 36.1897,
            Lo: -94.8723
        }
    });
});

app.post('/fly', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        status:  true
    });
});

app.listen(PORT, () => console.log(`App is alive at http://localhost:${PORT}`));