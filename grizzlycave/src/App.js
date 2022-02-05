import './App.css';
import News from "./pages/News"
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import GuardedRoute from './components/GuardedRoute';
import { PublicRoute } from './components/PublicRoute';

function App() {
  return (
   <Router>
     <Navbar/>
     <Switch>
       <Route path="/" exact component={Home}/>
       <PublicRoute path="/signin" exact component={SignIn} />
       <PublicRoute path="/signup" exact component={SignUp}/>
       <Route path="/news" exact component={News}/>
       <GuardedRoute path="/profile" exact component={Profile}/>
     </Switch>
   </Router>
  );
}

export default App;

