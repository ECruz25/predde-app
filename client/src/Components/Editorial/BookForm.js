import { Button, Modal, Form, Input, Radio, Icon, Upload, Select } from 'antd';
import React from 'react';
import withAuth from '../HOC/withAuth';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;

const BookForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      categories: []
    };
    async componentDidMount() {
      const response = await fetch('api/category');
      const categoriesResponse = await response.json();
      this.setState({ categories: categoriesResponse });
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Login"
          okText="Login"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="name">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the name!'
                  }
                ]
              })(<Input type="text" placeholder="Nombre" autocomplete="off" />)}
            </Form.Item>
            <Form.Item label="price">
              {getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the price!'
                  }
                ]
              })(
                <Input
                  prefix="L"
                  name="price"
                  type="number"
                  autocomplete="off"
                />
              )}
            </Form.Item>
            <Form.Item label="photo">
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
            </Form.Item>
            <Select style={{ width: 150 }} onChange={() => {}}>
              {this.state.categories.map(category => (
                <Option value={category._id} key={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Form.Item label="description">
              {getFieldDecorator('description')(
                <TextArea placeholder="Descripción" autocomplete="off" />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class LoginButton extends React.Component {
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
      const response = await fetch('/api/user/authenticate', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        form.resetFields();
        this.setState({ visible: false });
      } else {
        console.error(err);
        alert('Error logging in please try again');
      }
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Agregar Libro
        </Button>
        <BookForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default withAuth(LoginButton);
