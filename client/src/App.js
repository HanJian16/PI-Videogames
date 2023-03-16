import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateGame from './components/CreateGame/CreateGame.jsx';
import Detail from './components/Detail/Detail.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path='/game' component={CreateGame}/>
          <Route path="/home/:id" component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;