
import {Device, Lamp, Ac, Blinds} from '../Classes/Device';

let initialDevices: Device[] = [
    new Lamp("Living room lamp", "living room", true, true, "white", 100),
    new Ac("ac1", "living room", true, false, 18),
    new Lamp("lamp2", "living room", true, true, "#F5C338", 100),
    new Lamp("Kitchen big lamp", "Kitchen", true, true, "#F22734", 100),
    new Blinds("blinds1", "Bedroom", true, true, false),
    new Blinds("blinds2", "Bedroom", true, true, true),
    new Blinds("Diningg room blinds1", "Bedroom", true, true, true),
    new Ac("Thermometer", "living room", true, true, 50),
];

export default initialDevices;
