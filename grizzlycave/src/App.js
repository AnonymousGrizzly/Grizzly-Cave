import './App.css';
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";

function App() {
  return (
   <Router>
     <Navbar/>
     <Switch>
       <Route path="/" exact component={Home} />
     </Switch>
   </Router>
  );
}

export default App;
