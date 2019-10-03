import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './Login';

const Editorial = () => {
  return (
    <div>
      {/* <Link to="/editorial/login">Login</Link> */}
      <Login></Login>
    </div>
  );
};

export default Editorial;
