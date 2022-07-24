
import './App.css';
import Product from './components/Product';
import Item from './components/Item';
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
function App() {
  return (

    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/Product" component={Product} />
        <Route exact path="/Product/:id" component={Item} />
      </Switch>
    </div>
  );
}

export default App;
