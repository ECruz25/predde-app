import React, { useState } from 'react';
import { Col, Card, InputNumber, Icon } from 'antd';
const { Meta } = Card;

const Book = ({ book, addToCart }) => {
  const [amount, setAmount] = useState(1);
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={`/books/${book.image}`} />}
      actions={[
        <InputNumber
          size="small"
          min={1}
          max={250}
          defaultValue={1}
          onChange={value => setAmount(value)}
          style={{ width: 50 }}
          value={amount}
        />,
        <Icon
          type="shopping-cart"
          key="edit"
          onClick={() => {
            addToCart({ ...book, amount });
            setAmount(1);
          }}
        />,
        <Icon type="edit" key="edit" />
      ]}
    >
      <Meta title={book.name} description={`L. ${book.price.toFixed(2)}`} />
    </Card>
  );
};

export default Book;
