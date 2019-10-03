import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import CategoriesForm from './categoriesForm';
import Login from './Login';

const Editorial = () => {
  return (
    <div>
      <Login></Login>
      <CategoriesForm></CategoriesForm>
    </div>
  );
};

export default Editorial;
