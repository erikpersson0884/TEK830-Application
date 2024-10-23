import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'
import { TimeProvider, DeviceProvider, SleepCycleTimesProvider } from './Contexts.tsx'


const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <TimeProvider>
                <DeviceProvider>
                    <SleepCycleTimesProvider>
                        <App />
                    </SleepCycleTimesProvider>
                  </ DeviceProvider>
            </TimeProvider>

        </StrictMode>,
    );
} else {
    console.error('Root element not found');
}
