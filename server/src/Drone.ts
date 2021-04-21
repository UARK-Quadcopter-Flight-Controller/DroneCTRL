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

    private startTime: Date;


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
        this.battery = 0;
        this.rssi = -50;
        this.startTime = new Date();
    }
    
    public getGPS(): {latitude: number, longitude: number} {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        }
    }

    public setGPS(latitude: number, longitude: number): void {
        // Guard clauses
        if(!latitude) { this.Logger.error(`No latitude was passed to the ${this.setGPS.name} call`); return; }
        if(!longitude) { this.Logger.error(`No longitude was passed to the ${this.setGPS.name} call`); return; }

        this.latitude = latitude;
        this.longitude = longitude;
        this.Logger.debug(`Set GPS coordinates to lat: ${latitude}, lon: ${longitude}`);
    }

    public getAltitude(): number {
        return this.altitude;
    }

    public setAltitude(altitude: number): void {
        // Guard clause
        if(!altitude && typeof(altitude) !== 'number') { this.Logger.error(`No altitude was passed to the ${this.setAltitude.name} call`); return; }

        this.altitude = altitude;
        this.Logger.debug(`Set altitude to ${altitude} ft`);
    }

    public getTemperature(): number {
        return this.temperature;
    }

    public setTemperature(temperature: number): void {
        // Guard clauses
        if(!temperature && typeof(temperature) !== 'number') { this.Logger.error(`No temperature was passed to the ${this.setTemperature.name} call`); return; }

        this.temperature = temperature;
        this.Logger.debug(`Set temperature to ${temperature} degrees`);
    }

    public getPressure(): number {
        return this.pressure;
    }

    public setPressure(pressure: number): void {
        // Guard clauses
        if(!pressure && typeof(pressure) !== 'number') { this.Logger.error(`No pressure was passed to the ${this.setPressure.name} call`); return; }

        this.pressure = pressure;
        this.Logger.debug(`Set pressure to ${pressure} degrees`);
    }

    public getHeading(): number {
        return this.heading;
    }

    public setHeading(heading: number): void {
        // Guard clauses
        if(!heading && typeof(heading) !== 'number') { this.Logger.error(`No heading was passed to the ${this.setHeading.name} call`); return; }

        this.heading = heading;
        this.Logger.debug(`Set heading to ${heading} degrees`);
    }

    public getGyroscope(): { Gx: number, Gy: number, Gz: number } {
        return {
            Gx: this.gyroscopeX,
            Gy: this.gyroscopeY,
            Gz: this.gyroscopeZ
        };
    }

    public setGyroscope(x: number, y: number, z: number): void {
        // Guard clauses
        if(!x && typeof(x) !== 'number') { this.Logger.error(`No x was passed to the ${this.setGyroscope.name} call`); return; }
        if(!y && typeof(y) !== 'number') { this.Logger.error(`No y was passed to the ${this.setGyroscope.name} call`); return; }
        if(!z && typeof(z) !== 'number') { this.Logger.error(`No z was passed to the ${this.setGyroscope.name} call`); return; }

        this.gyroscopeX = x;
        this.gyroscopeY = y;
        this.gyroscopeZ = z;
        this.Logger.debug(`Set gyroscope values to (${this.gyroscopeX}, ${this.gyroscopeY}, ${this.gyroscopeZ})`);
    }

    public getAccelerometer(): { Ax: number, Ay: number, Az: number } {
        return {
            Ax: this.accelerationX,
            Ay: this.accelerationY,
            Az: this.accelerationZ
        };
    }

    public setAccelerometer(x: number, y: number, z: number): void {
        // Guard clauses
        if(!x && typeof(x) !== 'number') { this.Logger.error(`No x was passed to the ${this.setAccelerometer.name} call`); return; }
        if(!y && typeof(y) !== 'number') { this.Logger.error(`No y was passed to the ${this.setAccelerometer.name} call`); return; }
        if(!z && typeof(z) !== 'number') { this.Logger.error(`No z was passed to the ${this.setAccelerometer.name} call`); return; }

        this.accelerationX = x;
        this.accelerationY = y;
        this.accelerationZ = z;
        this.Logger.debug(`Set gyroscope values to (${this.accelerationX}, ${this.accelerationY}, ${this.accelerationZ})`);
    }

    public getBattery(): number {
        return this.battery;
    }

    public setBattery(battery: number): void {
        // Guard clauses
        if(!battery && typeof(battery) !== 'number') { this.Logger.error(`No battery was passed to the ${this.setBattery.name} call`); return; }
        if(battery > 100 || battery < 0) { this.Logger.error(`Illegal battery value was passed to the function ${this.setBattery.name}: ${battery}`); return; }

        this.battery = battery;
        this.Logger.debug(`Set battery to ${battery} percent`);
    }

    public getRSSI(): number {
        return this.rssi;
    }

    public setRSSI(rssi: number): void {
        // Guard clauses
        if(!rssi && typeof(rssi) !== 'number') { this.Logger.error(`No rssi was passed to the ${this.setRSSI.name} call`); return; }

        this.rssi = rssi;
        this.Logger.debug(`Set rssi to ${rssi} degrees`);
    }

    public static getDistance(lat1: number, long1: number, alt1: number,
                              lat2: number, long2: number, alt2: number): number {

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

        return Math.sqrt(((x2 - x1) * (x2 - x1)) + 
                         ((y2 - y1) * (y2 - y1)) + 
                         ((z2 - z1) * (z2 - z1)))

    }

    public static getPressureFromAltitude(altitude: number): number {
        // P(a: feet): Pascals = 29.92exp(-0.0000366a) * 3386.39
        return ((29.92 * Math.exp(-0.0000366 * (altitude * 3.28084))) * 3386.39);
    }

}

export const instance = new Drone();