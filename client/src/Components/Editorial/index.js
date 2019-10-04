import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './Login';
import { Layout, Menu, Breadcrumb, Icon, Skeleton } from 'antd';
import withAuth from '../HOC/withAuth';
import CategoryForm from './CategoryForm';
import BooksList from './BooksList';
import Cart from './Cart';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const Editorial = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isLoadingBooks, setIsloadingBooks] = useState(true);
  const [books, setBooks] = useState(true);
  const [cart, setCart] = useState({});

  const fetchBooks = useCallback(async () => {
    if (selectedCategory) {
      const response = await fetch(`api/book/category/${selectedCategory._id}`);
      const booksList = await response.json();
      setBooks(booksList || []);
      setIsloadingBooks(false);
    } else {
      const response = await fetch('api/book');
      const booksList = await response.json();
      setBooks(booksList || []);
      setIsloadingBooks(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    checkLoggedIn();
    fetchCategories();
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, selectedCategory]);

  const fetchCategories = async () => {
    const response = await fetch('api/category');
    const categoriesList = await response.json();
    setCategories(categoriesList);
    setIsLoadingCategories(false);
  };

  const checkLoggedIn = () => {
    fetch('/api/user/checkToken').then(res => {
      if (res.status === 200) {
        setIsLoggedIn(true);
      }
    });
  };

  const addToCart = book => {
    const newCart = JSON.parse(JSON.stringify(cart));
    if (newCart[book._id]) {
      newCart[book._id] = {
        ...book,
        amount: newCart[book._id].amount + book.amount
      };
      setCart(newCart);
    } else {
      newCart[book._id] = JSON.parse(JSON.stringify(book));
      setCart(newCart);
    }
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
              inlineCollapsed
            >
              {isLoadingCategories ? (
                <div style={{ width: 100, marginLeft: 20 }}>
                  <Skeleton paragraph={{ rows: 12 }} active />
                </div>
              ) : (
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="book" />
                      Libros
                    </span>
                  }
                >
                  <Menu.Item
                    key="1"
                    onClick={() => {
                      setSelectedCategory();
                      setIsloadingBooks(true);
                    }}
                  >
                    Todos
                  </Menu.Item>
                  {categories.map((category, index) => (
                    <Menu.Item
                      key={index + 2}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsloadingBooks(true);
                      }}
                    >
                      {category.name}
                    </Menu.Item>
                  ))}
                  <CategoryForm />
                </SubMenu>
              )}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px' }}>
            {isLoadingBooks ? (
              <Skeleton paragraph={{ rows: 12 }} active />
            ) : (
              <Fragment>
                <Cart cart={cart} />
                <BooksList books={books} addToCart={addToCart} />
              </Fragment>
            )}
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
