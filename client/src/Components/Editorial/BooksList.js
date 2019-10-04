import React, { useEffect, useState } from 'react';
import { Card, Grid, Row, Col, Icon, InputNumber } from 'antd';
import Book from './Book';
const { Meta } = Card;

const BooksList = ({ books, addToCart }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridColumnGap: 75,
        gridRowGap: 25
      }}
    >
      {books.map(book => (
        <Book book={book} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default BooksList;
