import logo from './logo.svg';
import './App.css';
import smallImage from './small.jpg';
import bigImage from './big.png';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <TodoList />

      <img src={bigImage} alt="big"/>
      <img src={smallImage} alt="small"/>
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
          실전리액트 8월 4주차!
          learn react
        </a>
      </header>
    </div>
  );
}

export default App;
