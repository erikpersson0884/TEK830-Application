import { createContext, useContext } from "react";
import React from "react";
import { Device } from "./Classes/Device";
import { Time } from "./Classes/Time";
import initialDevices from './Controllers/IkeaAPI'



export const SleepCycleTimesContext = createContext<{
    bedTime: Time;
    wakeTime: Time;
    bedDimmingTimeLength: Time;
    wakeDimmingTimeLength: Time;
    setBedTime: (time: Time) => void;
    setWakeTime: (time: Time) => void;
    setBedDimmingTimeLength: (time: Time) => void;
    setWakeDimmingTimeLength: (time: Time) => void;
}>({
    bedTime: localStorage.getItem("bedTime") ? new Time(localStorage.getItem("bedTime") as string) : new Time("22:00"),
    wakeTime: localStorage.getItem("wakeTime") ? new Time(localStorage.getItem("wakeTime") as string) : new Time("06:00"),
    bedDimmingTimeLength: localStorage.getItem("bedDimmingTimeLength") ? new Time(localStorage.getItem("bedDimmingTimeLength") as string) : new Time("02:00"),
    wakeDimmingTimeLength: localStorage.getItem("wakeDimmingTimeLength") ? new Time(localStorage.getItem("wakeDimmingTimeLength") as string) : new Time("02:00"),

    setBedTime: () => {},
    setWakeTime: () => {},
    setBedDimmingTimeLength: () => {},
    setWakeDimmingTimeLength: () => {}
});

export const SleepCycleTimesProvider = ({ children }) => {
    const [bedTime, setBedTime] = React.useState<Time>(localStorage.getItem("bedTime") ? new Time(localStorage.getItem("bedTime") as string) : new Time("22:00"));
    const [wakeTime, setWakeTime] = React.useState<Time>(localStorage.getItem("wakeTime") ? new Time(localStorage.getItem("wakeTime") as string) : new Time("06:00"));
    const [bedDimmingTimeLength, setBedDimmingTimeLength] = React.useState<Time>(localStorage.getItem("bedDimmingTimeLength") ? new Time(localStorage.getItem("bedDimmingTimeLength") as string) : new Time("02:00"));
    const [wakeDimmingTimeLength, setWakeDimmingTimeLength] = React.useState<Time>(localStorage.getItem("wakeDimmingTimeLength") ? new Time(localStorage.getItem("wakeDimmingTimeLength") as string) : new Time("02:00"));

    React.useEffect(() => {
        localStorage.setItem("bedTime", bedTime.asString());
        localStorage.setItem("wakeTime", wakeTime.asString());
        localStorage.setItem("bedDimmingTimeLength", bedDimmingTimeLength.asString());
        localStorage.setItem("wakeDimmingTimeLength", wakeDimmingTimeLength.asString());
    }, [bedTime, wakeTime, bedDimmingTimeLength, wakeDimmingTimeLength]);
    

    return (
        <SleepCycleTimesContext.Provider value={{
            bedTime,
            wakeTime,
            bedDimmingTimeLength,
            wakeDimmingTimeLength,
            setBedTime,
            setWakeTime,
            setBedDimmingTimeLength,
            setWakeDimmingTimeLength
        }}>
            {children}
        </SleepCycleTimesContext.Provider>
    );
};



export function useSleepCycleTimesContext() {
    let context = useContext(SleepCycleTimesContext);

    if (context === undefined) {
        throw new Error("useSleepCycleTimesContext must be used within a SleepCycleTimesProvider");
    }

    return context;
}

export const TimeContext = createContext<Time>(Time.now());

const simulatedTimeFor1Minute = 1/3000;

export const TimeProvider = ({ children }) => {
    const [clock, setClock] = React.useState<Time>(Time.now());

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            // Create a new Time instance by adding 1 minute
            const newClock = clock.add(new Time("00:01"));
            setClock(newClock);
        }, simulatedTimeFor1Minute * 60 * 1000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [clock]); // Add clock as a dependency to ensure it uses the latest value

    return (
        <TimeContext.Provider value={clock}>
            {children}
        </TimeContext.Provider>
    );
};


export const DeviceContext = createContext<Device[]>(initialDevices);


export const DeviceProvider = ({ children }) => {
    const [devices, setDevices] = React.useState<Device[]>(initialDevices);
    
    return (
        <DeviceContext.Provider value={devices}>
            {children}
        </DeviceContext.Provider>
    );
}
