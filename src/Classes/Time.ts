export class Time {
    hours: number;
    minutes: number;

    initFromString(inputTime: string): void {
        const time = inputTime.split(":");
        const hours: number = parseInt(time[0]);
        const minutes: number = parseInt(time[1]);
        if (hours < 0 || hours > 24) {
            throw new Error("Hours must be between 0 and 24");
        }
        if (minutes < 0 || minutes > 60) {
            throw new Error("Minutes must be between 0 and 60");
        }
        this.hours = hours;
        this.minutes = minutes;
    }

    initFromDouble(inputTime: number): void {
        const hours = Math.floor(inputTime);
        const minutes = Math.round((inputTime - hours) * 60);
        this.hours = hours;
        this.minutes = minutes;
    }

    constructor(inputTime: string | number) {
        if (typeof inputTime === "string") {
            this.initFromString(inputTime);
        } else {
            this.initFromDouble(inputTime);
        }

    }


    static now(): Time {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return new Time(`${hours}:${minutes}`);
    }

    getHours(): number {
        return this.hours;
    }

    getMinutes(): number {
        return this.minutes;
    }

    setHours(hours: number): void {
        if (hours < 0 || hours > 24) {
            throw new Error("Hours must be between 0 and 24");
        }
        this.hours = hours;
    }

    setMinutes(minutes: number): void {
        if (minutes < 0 || minutes > 60) {
            throw new Error("Minutes must be between 0 and 60");
        }
        this.minutes = minutes;
    }

    asDouble(): number {
        return this.hours + this.minutes / 60;
    }

    static fromDouble(time: number): Time {
        const hours = Math.floor(time);
        const minutes = Math.round((time - hours) * 60);
        return new Time(`${hours}:${minutes}`);
    }

    asString(): string {
        const hours = this.hours < 10 ? `0${this.hours}` : this.hours;
        const minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
        return `${hours}:${minutes}`;
    }

    hourAsString(): string {
        return this.hours < 10 ? `0${this.hours}` : this.hours.toString();
    }

    minuteAsString(): string {
        return this.minutes < 10 ? `0${this.minutes}` : this.minutes.toString();
    }

    static fromString(time: string): Time {
        return new Time(time);
    }

    add(time: Time): Time {
        let newHours: number = this.hours + time.hours + Math.floor((this.minutes + time.minutes) / 60);
        newHours = newHours % 24;
        let newMinutes: number = (this.minutes + time.minutes) % 60;
        return new Time(`${newHours}:${newMinutes}`);
    }

    subtract(time: Time): Time {
        const hours = this.hours - time.hours;
        const minutes = this.minutes - time.minutes;
        this.hours = hours - Math.floor(minutes / 60);
        this.minutes = minutes % 60;
        return this;
    }

        
}
