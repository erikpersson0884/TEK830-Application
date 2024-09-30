
export class Device {
    name: string;
    place: string;
    isPoweredOn: boolean;
    isIncluded: boolean;

    constructor(name: string, place: string, isPoweredOn: boolean, isIncluded: boolean) {
        this.name = name;
        this.place = place;
        this.isPoweredOn = isPoweredOn;
        this.isIncluded = isIncluded;
    }

    powerOn(): void {
        this.isPoweredOn = true;
    }

    powerOff(): void {
        this.isPoweredOn = false
    }

    includeDevice(): void {
        this.isIncluded = true;
    }

    excludeDevice(): void {
        this.isIncluded = false;
    }

    getDeviceName(): string {
        return this.name;
    }

    getDevicePlace(): string {
        return this.place;
    }

    getStatus(): string {
        return `Power: ${this.isPoweredOn ? 'ON' : 'OFF'}`;
    }
}

export class Lamp extends Device {
    color: string;
    brightness: number;

    constructor(name: string, place: string, isPoweredOn: boolean, isIncluded: boolean, color: string, brightness: number) {
        super(name, place, isPoweredOn, isIncluded);
        this.color = color;
        this.brightness = brightness;
    }

    setColor(color: string): void {
        this.color = color;
    }

    setBrightness(brightness: number): void {
        if (brightness < 0 || brightness > 100) {
            throw new Error("Brightness must be between 0 and 100");
        }
        this.brightness = brightness;
    }

    getStatus(): string {
        return `Power: ${this.isPoweredOn ? 'ON' : 'OFF'},\n Color: ${this.color},\n Brightness: ${this.brightness}`;
    }
}

export class Ac extends Device {
    temperature: number;

    
    constructor(name: string, place: string, isPoweredOn: boolean, isIncluded: boolean, temperature: number) {
        super(name, place, isPoweredOn, isIncluded);
        this.temperature = temperature;
    }
    
    setTemperature(temperature: number): void {
        if (temperature < 0 || temperature > 100) {
            throw new Error("Temperature must be between 0 and 100");
        }
        this.temperature = temperature;
    }

    getStatus(): string {
        return `Power: ${this.isPoweredOn ? 'ON' : 'OFF'},\n Temperature: ${this.temperature}`;
    }
}

export class Blinds extends Device {
    isOpen: boolean;

    constructor(name: string, place: string, isPoweredOn: boolean, isIncluded: boolean, isOpen: boolean) {
        super(name, place, isPoweredOn, isIncluded);
        this.isOpen = isOpen;
    }

    openBlinds(): void {
        this.isOpen = true;
    }

    closeBlinds(): void {
        this.isOpen = false;
    }

    getStatus(): string {
        return `Power: ${this.isPoweredOn ? 'ON' : 'OFF'},\n Open: ${this.isOpen}`;
    }
}