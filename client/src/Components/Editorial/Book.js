import React, { useState } from 'react';
import {
  Col,
  Card,
  InputNumber,
  Icon,
  Popconfirm,
  message,
  Tooltip
} from 'antd';
import BookForm from './BookForm';
const { Meta } = Card;

const actions = (
  isLoggedIn,
  addToCart,
  amount,
  setAmount,
  book,
  deleteBook,
  fetchBooks
) => {
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
      <Tooltip title="Agregar libros al carrito">
        <Icon type="shopping-cart" key="addToCart" onClick={addToCart} />
      </Tooltip>,
      <Tooltip title="Editar libro">
        <BookForm showAsIcon isEditing book={book} fetchBooks={fetchBooks} />
      </Tooltip>,
      <Tooltip title="Eliminar libro">
        <Popconfirm
          title="Esta seguro que desea eliminar este libro?"
          onConfirm={deleteBook}
          okText="Yes"
          cancelText="No"
        >
          <Icon type="delete" key="delete" />
        </Popconfirm>
      </Tooltip>
    ];
  }
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
    <Tooltip title="Agregar libros al carrito">
      <Icon type="shopping-cart" key="addToCart" onClick={addToCart} />
    </Tooltip>
  ];
};

const Book = ({ book, addToCart, fetchBooks, isLoggedIn }) => {
  const [amount, setAmount] = useState(1);

  const deleteBook = async () => {
    const response = await fetch(`api/book/${book._id}`, {
      method: 'DELETE'
    });
    if (response.status === 200) {
      message.success(`${book.name} eliminado`);
      fetchBooks();
    } else {
      message.error('Error');
    }
  };
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src={`/books/${book.image}`}
          style={{ heigth: 238, width: 238 }}
        />
      }
      actions={actions(
        isLoggedIn,
        () => {
          addToCart({ ...book, amount });
          setAmount(1);
        },
        amount,
        setAmount,
        book,
        deleteBook,
        fetchBooks
      )}
    >
      <Meta title={book.name} description={`L. ${book.price.toFixed(2)}`} />
    </Card>
  );
};

export default Book;
