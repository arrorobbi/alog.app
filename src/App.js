import "./App.css";
import {
  //   createBrowserRouter,
  //   RouterProvider,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import React from "react";
import ForecastPage from "./pages/forecast";
import Details from "./pages/details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ForecastPage />} />
        <Route path="/forecast/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
