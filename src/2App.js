import './App.css';
import { useState } from 'react'; //for hooks cause need render every change
import Input from './components/input/input';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

function App() {
    // decrale useState 1 by 1
    const [error, setError] = useState('')
    const [number, setNumber] = useState(0)
    // const [name, setName] = useState("")
    // const [age, setAge] = useState("")
    // const [year, setYear] = useState("")

    // declar useState as object
    const [form, setForm] = useState({
        name: '',
        year: 0,
        age: 0
    })


    //function click for using useState()
    const click = ()=>{
        setNumber(number+1)
    }
  
    const handleSubmit = () =>{
        const date = Date.now()
        const today = new Date(date)
        if(form.name === ""){
            setError("cannot be null")
        }
        // parsing object form to get the key and value
        setForm({...form, age: today.getFullYear() - form.year})
    }

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

  return (
    <>
    <BrowserRouter>
        <Route path='/' element={<App/>}>
            
        </Route>
    </BrowserRouter>
    <h1>Counter App</h1>
    <p>Current Number Count {number}</p>
    {/* onClik is params from button that will have click button and send the click function */}
    <button onClick={click}>Click Me</button>

    <hr/>
    <h1>Input App</h1>
    {/* onChange is for inputing on form and the value is in object response e.tager.value */}
    {/* using handleChange function need name for naming form */}
    name: <Input type='text' value={form.name} name='name' onChange={handleChange}></Input> 
    {/* default usage of onChange */}
    year: <input type='number' value={form.year} onChange={(e) => setForm({...form, year: e.target.value})}></input>
    <br/>
    My age : {form.age}
    <button onClick={handleSubmit}>Submit</button>
    <p style={{color:'red'}}>{error}</p>
    </>
  );
}

export default App;
