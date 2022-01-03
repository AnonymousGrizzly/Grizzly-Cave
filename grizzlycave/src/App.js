import './App.css';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";

function App() {
  return (
   <Router>
     <Navbar/>
     <Switch>
       <Route path="/" exact component={Home} />
       <Route path="/signup" exact component={SignUp} />
     </Switch>
   </Router>
  );
}

export default App;
