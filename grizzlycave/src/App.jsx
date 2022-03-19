import './App.css';
import News from './pages/News';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Mail from './pages/Mail';
import Storage from './pages/Storage';
import GuardedRoute from './components/GuardedRoute';
import { PublicRoute } from './components/PublicRoute';
import { AuthProvider } from './hooks/useAuth';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <PublicRoute path="/signin" exact component={SignIn} />
          <PublicRoute path="/signup" exact component={SignUp} />
          <Route path="/news" exact component={News} />
          <GuardedRoute path="/profile" exact component={Profile} />
          <GuardedRoute path="/mail" exact component={Mail} />
          <GuardedRoute path="/storage" exact component={Storage} />
          <Route path="*" component={NotFound}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
