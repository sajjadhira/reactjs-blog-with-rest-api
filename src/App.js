import Navbar from './Navbar';
import Content from './Content';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Create from './Create';
import Blogdetails from './Blogdetails';
import NotFound from './NotFound';

// the base app
function App() {

  return (
    <Router>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Content />
        </Route>
        <Route exact path='/create'>
          <Create />
        </Route>
        <Route path='/blogs/:id'>
          <Blogdetails />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
