import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser, history }) => {
  const [state, setState] = useState({
    username: '',
    password: '',
    message: '',
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/api/auth/login', {
        username: state.username,
        password: state.password,
      })
      .then((response) => {
        // redirect
        history.push('/');
        // update state for user in <App/>
        console.log(response);
        setUser(response.data);
      })
      .catch((err) => {
        setState({ ...state, message: err.response.data.message });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" value={state.username} onChange={handleChange} />

        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={state.password} onChange={handleChange} />

        <button type="submit">Sign in</button>
      </form>
      {state.message && <p>{state.message}</p>}
    </>
  );
};

export default Login;
