import React from "react";

import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import "./App.css";

import SettingsPage from "./Components/SettingsPage/SettingsPage";
import Header from "./Components/Header/Header";
import StatusPage from "./Components/StatusPage/StatusPage";
import Footer from "./Components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.css";

import { useState } from "react";
import { Device } from "./classes";
import initialDevices from "./Controllers/IkeaAPI";

function App() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);

  return (
    <>
      <BrowserRouter basename="/TEK830-Application">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<StatusPage devices={devices} setDevices={setDevices} />}
          />

          <Route
            path="/settings"
            element={<SettingsPage devices={devices} setDevices={setDevices} />}
          />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </>
  );
}

export default App;
