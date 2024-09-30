
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
}

export class Ac extends Device {
    speed: number;

    constructor(name: string, place: string, isPoweredOn: boolean, isIncluded: boolean, speed: number) {
        super(name, place, isPoweredOn, isIncluded);
        this.speed = speed;
    }

    setSpeed(speed: number): void {
        if (speed < 0 || speed > 100) {
            throw new Error("Speed must be between 0 and 100");
        }
        this.speed = speed;
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
}