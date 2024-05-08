import './App.css';
import {
//   createBrowserRouter,
//   RouterProvider,
  useParams,
  Route,
  Link,
  BrowserRouter,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Table from './components/table/table';
import React from 'react'

const data = [ 
    {
      id: 1,
      name: "Robbi",
      age: 23
    },
    {
      id: 2,
      name: "Arro",
      age: 24
    },
    {
      id: 3,
      name: "Firizky",
      age: 24
    },
  ]

function useQuery() {
    const {search} = useLocation()
    return React.useMemo(() => new URLSearchParams(search),[search])    
}

// for action router must be capitalize in the first
function Home(){
    return <h1>HOME</h1>
}

function Categories(){
    // get query from query params
    const query = useQuery() 
    console.log(query.get('id')) 
    return <h1>CATEGORIES</h1>
}

function User(){
    return(
    <>
    <Table users={data}/>
    </>

    )
}

function DetailUser(){
    // get params from url
    const {id} = useParams()
    // navigate or direct in function (like Link)
    const navigate = useNavigate()
    console.log(id);

    React.useEffect(() => {

    navigate(`/categories`) // example
    })
    return(
    <>
    <Table users={data}/>
    </>

    )
}

function App() {
  return (
    <BrowserRouter>
    <ul>
        <li>
            <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to='/categories'>Categories</Link>
        </li>
        <li>
            <Link to='/user'>User</Link>
        </li>
    </ul>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='categories' element={<Categories/>} />
        <Route path='user' element={<User/>} />
        <Route path='user/:id' element={<DetailUser/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
