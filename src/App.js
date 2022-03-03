import Navbar from './Navbar';
import Content from './Content';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Create from './Create';
import Blogdetails from './Blogdetails';
import NotFound from './NotFound';
import Blogs from './Blogs';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClinet = new QueryClient();
// the base app
function App() {

  return (
    <QueryClientProvider client={queryClinet}>
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
        <Route exact path='/all'>
          <Blogs />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
