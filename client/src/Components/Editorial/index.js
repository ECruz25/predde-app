import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import CategoriesForm from './categoriesForm';

const Editorial = () => {
  return (
    <div>
      <Link to="/editorial/login">Login</Link>
      <CategoriesForm></CategoriesForm>
    </div>
  );
};

export default Editorial;
