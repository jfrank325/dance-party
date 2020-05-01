import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';
import Posts from './components/posts/Posts';
import SinglePost from './components/posts/SinglePost';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Profile from './components/profile/Profile';
import SingleUserPosts from './components/SingleUserPosts';
class App extends React.Component {
  state = {
    user: this.props.user,
  };

  setUser = (userObj) => {
    this.setState({
      user: userObj,
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar setUser={this.setUser} user={this.state.user} />
        <div className="main-container">
          <Route
            path="/signup"
            render={(props) => (
              <Signup
                history={props.history}
                // {...props}
                setUser={this.setUser}
              />
            )}
            // component={Signup}
          />
          <Route path="/login" render={(props) => <Login history={props.history} setUser={this.setUser} />} />

          <Route exact path="/" render={(props) => <Posts {...props} user={this.state.user} />} />
          <Route
            exact
            path="/posts/authored/:authorId"
            render={(props) => <SingleUserPosts {...props} user={this.state.user} />}
          />
          <Route path="/profile" render={() => <Profile user={this.state.user} />} />
          <Route
            exact
            path="/posts/:postId"
            render={(props) => <SinglePost {...props} isLoggedIn={Boolean(this.state.user)} user={this.state.user} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
