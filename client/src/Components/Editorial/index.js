import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './Login';
import { Layout, Menu, Breadcrumb, Icon, Skeleton } from 'antd';
import withAuth from '../HOC/withAuth';
import CategoryForm from './CategoryForm';
import BooksList from './BooksList';
import Cart from './Cart';
import CompleteOrderForm from './CompleteOrderForm';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Editorial = ({ history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isLoadingBooks, setIsloadingBooks] = useState(true);
  const [books, setBooks] = useState(true);
  const [cart, setCart] = useState({});
  const [showCompleteOrderForm, setShowCompleteOrderForm] = useState(false);

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
    const cartInStorage = JSON.parse(localStorage.getItem('predde-cart')) || {};
    setCart(cartInStorage);
  }, []);

  useEffect(() => {
    checkLoggedIn();
    fetchCategories();
    fetchBooks();
  }, [fetchBooks]);

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

  const clearCart = () => {
    setCart({});
    localStorage.setItem('predde-cart', JSON.stringify({}));
  };

  const addToCart = book => {
    const newCart = JSON.parse(JSON.stringify(cart));
    if (newCart[book._id]) {
      newCart[book._id] = {
        ...book,
        amount: newCart[book._id].amount + book.amount
      };
      setCart(newCart);
      localStorage.setItem('predde-cart', JSON.stringify(newCart));
    } else {
      newCart[book._id] = JSON.parse(JSON.stringify(book));
      setCart(newCart);
      localStorage.setItem('predde-cart', JSON.stringify(newCart));
      debugger;
    }
  };

  return (
    <Layout>
      <Header
        className="header"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <img src="logo.png" alt="logo" style={{ width: 64, height: 64 }} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: '10px'
          }}
        >
          {!isLoggedIn && <Login />}
          <div style={{ marginTop: 2 }}>
            <Cart
              cart={cart}
              setShowCompleteOrderForm={setShowCompleteOrderForm}
            />
          </div>
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider
            width={200}
            style={{ background: '#fff' }}
            breakpoint="md"
            collapsedWidth="0"
            onBreakpoint={broken => {}}
            onCollapse={(collapsed, type) => {}}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              inlineCollapsed
            >
              {isLoadingCategories ? (
                <div style={{ width: '80%', marginLeft: 20, marginRight: 20 }}>
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
                </SubMenu>
              )}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', height: '90vh' }}>
            {isLoadingBooks ? (
              <Skeleton paragraph={{ rows: 12 }} active />
            ) : (
              <Fragment>
                <BooksList
                  books={books}
                  addToCart={addToCart}
                  fetchBooks={fetchBooks}
                  isLoggedIn={isLoggedIn}
                />
                {showCompleteOrderForm && (
                  <CompleteOrderForm
                    cart={cart}
                    clearCart={clearCart}
                    setShowCompleteOrderForm={setShowCompleteOrderForm}
                  />
                )}
              </Fragment>
            )}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Editorial;
