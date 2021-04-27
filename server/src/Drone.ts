import Logger, { LoggerStructure } from '@zackheil/lambda-logger';

export default class Drone {

    private Logger: LoggerStructure;
    
    // GPS Module data
    private latitude: number;
    private longitude: number;

    // Barometer Module Data
    private altitude: number;
    private absoluteAltitude: number;
    private temperature: number;
    private pressure: number;

    // Magetometer Module Data
    private heading: number;

    // Gyroscope Module Data
    private accelerationX: number;
    private accelerationY: number;
    private accelerationZ: number;

    private gyroscopeX: number;
    private gyroscopeY: number;
    private gyroscopeZ: number;

    // Drone Data
    private battery: number;
    private rssi: number;

    private startTime: number;
    private liftOffTime: number;


    constructor(injectedLogger?: LoggerStructure) {
        // Create a new logger
        if(!injectedLogger) { this.Logger = new Logger(); }
        else { this.Logger = injectedLogger; }

        // Initialize the GPS lat/long values to (general) Fayetteville, AR
        this.latitude = 36.0662;
        this.longitude = -94.1579;

        // Initialize the barometer values
        this.altitude = 0;
        this.absoluteAltitude = 0;
        this.pressure = 0;
        this.temperature = 75;

        // Initialize the magnetometer to North
        this.heading = 0;

        // Initialize the IMU
        this.gyroscopeX = 0.0;
        this.gyroscopeY = 0.0;
        this.gyroscopeZ = 1.0;
        this.accelerationX = 0.0;
        this.accelerationY = 0.0;
        this.accelerationZ = 0.0;

        // Initialize the values of the drone
        this.battery = 100;
        this.rssi = -50;
        this.startTime = Date.now();
        this.liftOffTime = 0;
    }
    
    public getGPS(): {latitude: number, longitude: number} {
        this.Logger.trace(`Starting ${this.getGPS.name}`);
        this.Logger.trace(`Finishing ${this.getGPS.name} with: `, { latitude: this.latitude, longitude: this.longitude });
        return { latitude: this.latitude, longitude: this.longitude }
    }

    public setGPS(latitude: number, longitude: number): void {
        this.Logger.trace(`Starting: ${this.setGPS.name} with: `, { latitude: latitude, longitude: longitude });

        // Guard clauses
        if(!latitude) { this.Logger.error(`No latitude was passed to the ${this.setGPS.name} call`); return; }
        if(!longitude) { this.Logger.error(`No longitude was passed to the ${this.setGPS.name} call`); return; }

        this.latitude = latitude;
        this.longitude = longitude;
        this.Logger.debug(`Set GPS coordinates to lat: ${latitude}, lon: ${longitude}`);

        this.Logger.trace(`Finishing ${this.setGPS.name}`);
    }

    public getAltitude(): number {
        this.Logger.trace(`Starting ${this.getAltitude.name}`);
        this.Logger.trace(`Finishing ${this.getAltitude.name} with: `, { altitude: this.altitude });
        return this.altitude;
    }

    public setAltitude(altitude: number): void {
        this.Logger.trace(`Starting: ${this.setAltitude.name} with: `, { altitude: altitude });

        // Guard clause
        if(!altitude && typeof(altitude) !== 'number') { this.Logger.error(`No altitude was passed to the ${this.setAltitude.name} call`); return; }

        if(altitude <= 0) { return }

        this.altitude = altitude;
        this.Logger.debug(`Set altitude to ${altitude} ft`);

        this.Logger.trace(`Finishing ${this.setAltitude.name}`);
    }

    public getTemperature(): number {
        this.Logger.trace(`Starting ${this.getTemperature.name}`);
        this.Logger.trace(`Finishing ${this.getTemperature.name} with: `, { temperature: this.temperature });
        return this.temperature;
    }

    public setTemperature(temperature: number): void {
        this.Logger.trace(`Starting: ${this.setTemperature.name} with: `, { temperature: temperature });

        // Guard clauses
        if(!temperature && typeof(temperature) !== 'number') { this.Logger.error(`No temperature was passed to the ${this.setTemperature.name} call`); return; }

        this.temperature = temperature;
        this.Logger.debug(`Set temperature to ${temperature} degrees`);

        this.Logger.trace(`Finishing ${this.setTemperature.name}`);
    }

    public getPressure(): number {
        this.Logger.trace(`Starting ${this.getPressure.name}`);
        this.Logger.trace(`Finishing ${this.getPressure.name} with: `, { pressure: this.pressure });
        return this.pressure;
    }

    public setAbsoluteAltitude(altitude: number): void {
        this.Logger.trace(`Starting: ${this.setAbsoluteAltitude.name} with: `, { altitude: altitude });

        // Guard clauses
        if(!altitude && typeof(altitude) !== 'number') { this.Logger.error(`No altitude was passed to the ${this.setAbsoluteAltitude.name} call`); return; }

        // Convert iPhone meter value to feet
        this.absoluteAltitude = altitude * 3.28084; 
        this.pressure = Drone.getPressureFromAltitude(altitude);
        this.Logger.debug(`Set pressure: ${this.pressure} and absolute altitude: ${this.absoluteAltitude}`);

        this.Logger.trace(`Finishing ${this.setAbsoluteAltitude.name}`);
    }

    public getHeading(): number {
        this.Logger.trace(`Starting ${this.getHeading.name}`);
        this.Logger.trace(`Finishing ${this.getHeading.name} with: `, { heading: this.heading });
        return this.heading;
    }

    public setHeading(heading: number): void {
        this.Logger.trace(`Starting: ${this.setHeading.name} with: `, { heading: heading });

        // Guard clauses
        if(!heading && typeof(heading) !== 'number') { this.Logger.error(`No heading was passed to the ${this.setHeading.name} call`); return; }
        
        if(this.heading < 0) {
            this.heading = 359;
        }
        else if(this.heading > 359.999) {
            this.heading = heading % 360;
        }
        else this.heading = heading;
        this.Logger.debug(`Set heading to ${heading} degrees`);

        this.Logger.trace(`Finishing ${this.setHeading.name}`);
    }

    public getGyroscope(): { Gx: number, Gy: number, Gz: number } {
        this.Logger.trace(`Starting ${this.getGyroscope.name}`);
        this.Logger.trace(`Finishing ${this.getGyroscope.name} with: `, { Gx: this.gyroscopeX, Gy: this.gyroscopeY, Gz: this.gyroscopeZ });
        return {
            Gx: this.gyroscopeX,
            Gy: this.gyroscopeY,
            Gz: this.gyroscopeZ
        };
    }

    public setGyroscope(x: number, y: number, z: number): void {
        this.Logger.trace(`Starting: ${this.setGyroscope.name} with: `, { x: x, y: y, z: z });

        // Guard clauses
        if(!x && typeof(x) !== 'number') { this.Logger.error(`No x was passed to the ${this.setGyroscope.name} call`); return; }
        if(!y && typeof(y) !== 'number') { this.Logger.error(`No y was passed to the ${this.setGyroscope.name} call`); return; }
        if(!z && typeof(z) !== 'number') { this.Logger.error(`No z was passed to the ${this.setGyroscope.name} call`); return; }

        this.gyroscopeX = x;
        this.gyroscopeY = y;
        this.gyroscopeZ = z;
        this.Logger.debug(`Set gyroscope values to (${this.gyroscopeX}, ${this.gyroscopeY}, ${this.gyroscopeZ})`);

        this.Logger.trace(`Finishing ${this.setGyroscope.name}`);
    }

    public getAccelerometer(): { Ax: number, Ay: number, Az: number } {
        this.Logger.trace(`Starting ${this.getAccelerometer.name}`);
        this.Logger.trace(`Finishing ${this.getAccelerometer.name} with: `, { Ax: this.accelerationX, Ay: this.accelerationY, Az: this.accelerationZ });
        return {
            Ax: this.accelerationX,
            Ay: this.accelerationY,
            Az: this.accelerationZ
        };
    }

    public setAccelerometer(x: number, y: number, z: number): void {
        this.Logger.trace(`Starting: ${this.setAccelerometer.name} with: `, { x: x, y: y, z: z });

        // Guard clauses
        if(!x && typeof(x) !== 'number') { this.Logger.error(`No x was passed to the ${this.setAccelerometer.name} call`); return; }
        if(!y && typeof(y) !== 'number') { this.Logger.error(`No y was passed to the ${this.setAccelerometer.name} call`); return; }
        if(!z && typeof(z) !== 'number') { this.Logger.error(`No z was passed to the ${this.setAccelerometer.name} call`); return; }

        this.accelerationX = x;
        this.accelerationY = y;
        this.accelerationZ = z;
        this.Logger.debug(`Set gyroscope values to (${this.accelerationX}, ${this.accelerationY}, ${this.accelerationZ})`);

        this.Logger.trace(`Finishing ${this.setGyroscope.name}`);
    }

    public getBattery(): number {
        this.Logger.trace(`Starting ${this.getBattery.name}`);

        // Use the act of polling for a battery value to update the battery linearly with how long the drone has been "on"
        const secOn = this.getLifeTime() / 1000;

        // Drone batteries have an average life of 10 mins for 3s... roughly. Linearly determine the remaining percentage
        // In other words, start time + 10 minutes = 0% battery

        let newBattery = 100 - ((100 / (10 * 60) * secOn));
        this.setBattery(newBattery);

        // this.setHeading(this.getHeading() + 3);

        this.Logger.trace(`Finishing ${this.getBattery.name} with: `, { battery: this.battery });
        return this.battery;
    }

    public setBattery(battery: number): void {
        this.Logger.trace(`Starting: ${this.setBattery.name} with: `, { battery: battery });

        // Guard clauses
        if(!battery && typeof(battery) !== 'number') { this.Logger.error(`No battery was passed to the ${this.setBattery.name} call`); return; }
        
        if(battery > 100) { this.battery = 100; return; }
        else if(battery < 0) { this.battery = 0; return; }
        else { this.battery = battery; }

        this.Logger.debug(`Set battery to ${this.battery} percent`);
        this.Logger.trace(`Finishing ${this.setBattery.name}`);
    }

    public getRSSI(): number {
        this.Logger.trace(`Starting ${this.getRSSI.name}`);
        this.Logger.trace(`Finishing ${this.getRSSI.name} with: `, { rssi: this.rssi });
        return this.rssi;
    }

    public setRSSI(rssi: number): void {
        this.Logger.trace(`Starting: ${this.setRSSI.name} with: `, { rssi: rssi });

        // Guard clauses
        if(!rssi && typeof(rssi) !== 'number') { this.Logger.error(`No rssi was passed to the ${this.setRSSI.name} call`); return; }

        this.rssi = rssi;
        this.Logger.debug(`Set rssi to ${rssi} degrees`);

        this.Logger.trace(`Finishing ${this.setRSSI.name}`);
    }

    public getLifeTime(): number {
        this.Logger.trace(`Starting ${this.getLifeTime.name}`);
        const result = new Date().getTime() - this.startTime;
        this.Logger.trace(`Finishing ${this.getLifeTime.name} with: `, { lifetime: result });
        return result;
    }

    private tick(): void {
        this.Logger.trace(`Starting ${this.tick.name}`);

        if(this.altitude < 1) {
            this.liftOffTime = 0;
        }
        else {
            // t
        }
    }

    public static getDistance(lat1: number, long1: number, alt1: number,
                              lat2: number, long2: number, alt2: number, Logger?: LoggerStructure): number {

        if(Logger) Logger.trace(`Starting: ${this.getDistance.name} with: `, 
            { lat1: lat1, long1: long1, alt1: alt1, lat2: lat2, long2: long2, alt2: alt2 });

        const earthRadius = (6376.5 * 1000) * 3.28084; // m -> ft

        // Find spherical "rho" values 
        const r1 = earthRadius + alt1;
        const r2 = earthRadius + alt2;

        // Spherical coordinate -> Cartesian coordinate conversions
        const x1 = r1 * Math.cos(lat1) * Math.sin(long1);
        const y1 = r1 * Math.sin(long1) * Math.sin(lat1);
        const z1 = r1 * Math.cos(long1);

        const x2 = r2 * Math.cos(lat2) * Math.sin(long2);
        const y2 = r2 * Math.sin(long2) * Math.sin(lat2);
        const z2 = r2 * Math.cos(long2);

        const result = Math.sqrt(((x2 - x1) * (x2 - x1)) + 
                                 ((y2 - y1) * (y2 - y1)) + 
                                 ((z2 - z1) * (z2 - z1)));

        if(Logger) Logger.trace(`Finishing: ${this.getDistance.name} with: `, { distance: result });

        return result;

    }

    public static getPressureFromAltitude(altitude: number): number {
        // P(a: feet): Pascals = 29.92exp(-0.0000366a) * 3386.39
        return ((29.92 * Math.exp(-0.0000366 * (altitude * 3.28084))) * 3386.39);
    }
}

export const instance = new Drone();