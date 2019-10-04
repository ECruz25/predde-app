import React, { useState } from 'react';
import { Col, Card, InputNumber, Icon } from 'antd';
import BookForm from './BookForm';
const { Meta } = Card;

const actions = (isLoggedIn, addToCart, amount, setAmount, book) => {
  if (isLoggedIn) {
    return [
      <InputNumber
        size="small"
        min={1}
        max={250}
        defaultValue={1}
        onChange={value => setAmount(value)}
        style={{ width: 50 }}
        value={amount}
      />,
      <Icon type="shopping-cart" key="addToCart" onClick={addToCart} />,
      <BookForm showAsIcon isEditing book={book} />,
      <Icon type="delete" key="delete" onClick={() => {}} />
    ];
  }
};

const Book = ({ book, addToCart }) => {
  const [amount, setAmount] = useState(1);
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={`/books/${book.image}`} />}
      actions={actions(
        true,
        () => {
          addToCart({ ...book, amount });
          setAmount(1);
        },
        amount,
        setAmount,
        book
      )}
    >
      <Meta title={book.name} description={`L. ${book.price.toFixed(2)}`} />
    </Card>
  );
};

export default Book;
