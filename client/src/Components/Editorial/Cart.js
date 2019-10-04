import React, { Fragment, useState, useEffect } from 'react';
import { Table, Divider, Tag, Modal, Icon, Button } from 'antd';

const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    render: () => <Button icon="delete" size="small" type="danger" />
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
    key: 'total'
  }
];

const Cart = ({ cart }) => {
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
      <Button
        type="primary"
        shape="round"
        icon="shopping-cart"
        size="large"
        onClick={() => setIsOpen(true)}
      >
        {Object.keys(data).length}
      </Button>
      {isOpen && (
        <Modal
          visible={isOpen}
          title="Carrito"
          okText="Ordenar"
          onCancel={() => setIsOpen(false)}
          //   onOk={onCreate}
        >
          <Table columns={columns} dataSource={data} />
        </Modal>
      )}
    </Fragment>
  );
};

export default Cart;
