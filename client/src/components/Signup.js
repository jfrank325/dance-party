import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setUser, history }) => {
  const [state, setState] = useState({
    username: '',
    password: '',
    message: 'Error for U',
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post('/api/auth/signup', {
      username: state.username,
      password: state.password,
    });
    history.push('/');
    // update state for user in <App/>
    setUser(res.data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" value={state.username} onChange={handleChange} />

        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={state.password} onChange={handleChange} />

        <button type="submit">Sign up</button>
      </form>
      {state.message && <p>{state.message}</p>}
    </>
  );
};

export default Signup;
