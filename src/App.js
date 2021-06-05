import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Navbar from './components/layout/Navbar';
import PostList from './components/post/PostList';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import NewPost from './components/post/NewPost';
import EditPost from './components/post/EditPost';
import PostContent from './components/post/PostContent';
import UserState from './context/user/UserState';
import NotFound from './components/layout/NotFound';

function App() {
  return (
    <UserState>
      <GlobalStyles />
      <div className='container'>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/post/edit/:id'>
              <EditPost />
            </Route>
            <Route path='/post/new'>
              <NewPost />
            </Route>
            <Route path='/post/:id'>
              <PostContent />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/user/:id'>
              <PostList />
            </Route>
            <Route path='/'>
              <PostList />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserState>
  );
}

export default App;
