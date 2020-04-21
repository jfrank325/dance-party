import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';
import Posts from './components/posts/Posts';
import PostDetail from './components/posts/postDetail/PostDetail';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
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
    console.log('<App/> render: ', this.state.user);

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
            path="/posts/:postId"
            render={(props) => <PostDetail {...props} isLoggedIn={Boolean(this.state.user)} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
