import React, { useEffect, useState, Fragment } from 'react';
import { Card, Grid, Row, Col, Icon, InputNumber, Empty } from 'antd';
import Book from './Book';
import BookForm from './BookForm';
const { Meta } = Card;

const BooksList = ({ books, addToCart, fetchBooks, isLoggedIn }) => {
  return (
    <Fragment>
      {books.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gridColumnGap: 75,
            gridRowGap: 25
          }}
        >
          {books.map(book => (
            <Book
              book={book}
              addToCart={addToCart}
              fetchBooks={fetchBooks}
              isLoggedIn={isLoggedIn}
            />
          ))}
          <BookForm fetchBooks={fetchBooks}></BookForm>
        </div>
      ) : (
        <Empty description={<span>No hay libros</span>}>
          <BookForm fetchBooks={fetchBooks}></BookForm>
        </Empty>
      )}
    </Fragment>
  );
};

export default BooksList;
