import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter } from "react-router-dom";
import { injectSpeedInsights } from '@vercel/speed-insights'; // perf metrics
import "./css/index.css"; 
import App from './App.jsx'

injectSpeedInsights(); // RUM metrics (FCP, TTFB, CLS, etc.)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
