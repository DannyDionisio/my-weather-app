import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { WeatherDetail } from "./pages/WeatherDetail";
import { Provider } from "react-redux";
import { ThemeProvider } from "react-bootstrap";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider breakpoints={["lg", "md", "sm"]} minBreakpoint="sm">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/weatherDetail/:id" element={<WeatherDetail />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
