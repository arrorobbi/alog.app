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
import GraphicPage from './pages/graphics';
import Details from './pages/details';


function App() {
  return (
    <BrowserRouter>

    <Routes>
        <Route path='/' element={<ForecastPage/>} />
        <Route path='/graphics' element={<GraphicPage/>} />
        <Route path='/forecast/:id' element={<Details/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
