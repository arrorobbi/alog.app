import './App.css';
import {
//   createBrowserRouter,
//   RouterProvider,
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import React from 'react'
import ForecastPage from './pages/forecast';

function App() {
  return (
    <BrowserRouter>

    <Routes>
        <Route path='/' element={<ForecastPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
