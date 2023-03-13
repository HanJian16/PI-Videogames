import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path={"/"} render={() => <LandingPage />} />
        <Route exact path={"/home"} render={() => <Home />} />
      </div>
    </BrowserRouter>
  );
}

export default App;