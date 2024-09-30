
import {Device, Lamp, Ac, Blinds} from '../classes';
import React, { useState } from 'react';


let initialDevices: Device[] = [
    new Lamp("Living room lamp", "living room", true, true, "white", 100),
    new Ac("ac1", "living room", true, false, 50),
    new Lamp("lamp2", "living room", true, true, "green", 100),
    new Lamp("Kitchen big lamp", "Kitchen", true, true, "red", 100),
    new Blinds("blinds1", "Bedroom", true, true, false),
    new Ac("Thermometer", "living room", true, true, 50),
];

export default initialDevices;