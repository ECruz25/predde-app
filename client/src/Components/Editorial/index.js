import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './Login';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import withAuth from '../HOC/withAuth';
import CategoryForm from './CategoryForm';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const Editorial = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    checkLoggedIn();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch('api/category');
    const categoriesList = await response.json();
    setCategories(categoriesList);
  };

  const checkLoggedIn = () => {
    fetch('/api/user/checkToken').then(res => {
      if (res.status === 200) {
        setIsLoggedIn(true);
      }
    });
  };

  return (
    <Layout>
      <Header
        className="header"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div className="logo" />
        {!isLoggedIn && <Login />}
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="book" />
                    Libros
                  </span>
                }
              >
                <Menu.Item key="0">Todos</Menu.Item>
                {categories.map((category, index) => (
                  <Menu.Item key={index + 1}>
                    <Link to={`editorial/libros/${category._id}`}>
                      {category.name}
                    </Link>
                  </Menu.Item>
                ))}
                <CategoryForm />
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            Content
          </Content>
        </Layout>
      </Content>
    </Layout>
    // <div>
    //   <Login></Login>
    //   <CategoriesForm></CategoriesForm>
    // </div>
  );
};

export default Editorial;
