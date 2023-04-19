import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { WeatherDetail } from "./pages/WeatherDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/weatherDetail/:id" element={<WeatherDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
