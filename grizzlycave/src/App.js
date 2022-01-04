import './App.css';
import News from "./pages/News"
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
       <Route path="/news" exact component={News}/>
     </Switch>
   </Router>
  );
}

export default App;
