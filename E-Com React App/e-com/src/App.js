import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Items from './Components/Items';
import ItemDetails from './Components/ItemDetails';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Cart from './Components/Cart';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='my-5 mx-auto p-[30px]'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/items">
              <Items />
            </Route>
            <Route exact path="/item/:id">
              <ItemDetails />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
