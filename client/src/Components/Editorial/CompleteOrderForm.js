import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Icon,
  Upload,
  Select,
  message,
  Checkbox
} from 'antd';
import axios from 'axios';
import React from 'react';
import withAuth from '../HOC/withAuth';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;

const OrderForm = Form.create({ name: 'complete_order_form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      agreed: false
    };
    async componentDidMount() {
      const response = await fetch('api/category');
      const categoriesResponse = await response.json();
      this.setState({ categories: categoriesResponse });
    }

    render() {
      const { visible, onCancel, onCreate, form, book } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Completar Orden"
          okText="Ordenar"
          onCancel={onCancel}
          onOk={onCreate}
          okButtonProps={{ disabled: !this.state.agreed }}
        >
          <Form layout="vertical">
            <Form.Item label="Correo Electrónico">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Ingrese un correo electrónico'
                  }
                ]
              })(
                <Input
                  type="email"
                  placeholder="Correo Electrónico"
                  autocomplete="off"
                  id="email"
                />
              )}
            </Form.Item>
            <Form.Item label="Telefono de contacto">
              {getFieldDecorator('phoneNumber', {
                rules: [
                  {
                    required: true,
                    message:
                      'Ingrese un numero de telefono por el cual sera contactado'
                  }
                ]
              })(
                <Input
                  type="number"
                  placeholder="0000-0000"
                  autocomplete="off"
                  id="email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: this.state.agreed,
                onChange: ({ target: { checked } }) =>
                  this.setState({ agreed: checked })
              })(
                <Checkbox>
                  Estoy de acuerdo que seré contactado para confirmar la
                  informacion de mi órden y la vía de entrega.
                </Checkbox>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class BookButton extends React.Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const request = {
        ...values,
        books: Object.values(this.props.cart).map(book => book._id),
        bookAmount: Object.values(this.props.cart).map(book => book.amount),
        total: Object.values(this.props.cart)
          .map(t => t.amount * t.price)
          .reduce((total, num) => total + num),
        agreed: true
      };
      axios.post('/api/order', request, config).then(response => {
        message.success(`Se ha completado la orden`);
        this.setState({ visible: false });
        this.props.setShowCompleteOrderForm(false);
        form.resetFields();
        this.props.clearCart();
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    console.log(this.props.cart);
    return (
      <OrderForm
        wrappedComponentRef={this.saveFormRef}
        visible
        onCancel={this.handleCancel}
        onCreate={this.handleCreate}
      />
    );
  }
}

export default BookButton;
