import React, { Fragment, useState, useEffect } from 'react';
import { Table, Badge, Modal, Button } from 'antd';

const columns = [
  {
    title: 'Portada',
    dataIndex: 'image',
    key: 'image',
    render: image => (
      <img
        alt="example"
        src={`/books/${image}`}
        style={{ width: 32, height: 32 }}
      />
    )
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Cantidad',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: text => <span>{`L. ${text.toFixed(2)}`}</span>
  },
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    render: () => <Button icon="delete" size="small" type="danger" />
  }
];

const Cart = ({ cart, setShowCompleteOrderForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = Object.values(cart).map(val => ({
      ...val,
      total: val.amount * val.price
    }));
    setData(newData);
  }, [cart]);

  return (
    <Fragment>
      <Badge count={Object.keys(data).length}>
        <Button
          type="primary"
          icon="shopping-cart"
          size="large"
          onClick={() => setIsOpen(true)}
        ></Button>
      </Badge>
      {isOpen && (
        <Modal
          visible={isOpen}
          title="Carrito"
          okText="Completar Orden"
          onCancel={() => setIsOpen(false)}
          onOk={() => {
            setIsOpen(false);
            setShowCompleteOrderForm(true);
          }}
        >
          <Table columns={columns} dataSource={data} />
          <h3 style={{ textAlign: 'end' }}>
            Total: L.
            {data
              .map(t => t.total)
              .reduce((total, num) => total + num)
              .toFixed(2)}
          </h3>
        </Modal>
      )}
    </Fragment>
  );
};

export default Cart;
