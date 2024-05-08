import logo from './logo.svg';
import './App.css';
import Table from './components/table/table';


function App() {
  //data
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

  //function
  const hello = () => { 
    return "hello word"
  }

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* To call hello function and display to page*/}
          {hello()} 
          {/* call Table component 
            users is the params 
            and {arguments(data)}
          */}
          <Table users={data}>
          </Table>
          <br/>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
