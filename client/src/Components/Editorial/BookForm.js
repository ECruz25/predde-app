import { Button, Modal, Form, Input, Radio, Icon, Upload } from 'antd';
import React from 'react';
import withAuth from '../HOC/withAuth';

const BookForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    async componentDidMount() {
      const response = await fetch('api/categories');
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
              })(<Input type="text" placeholder="Nombre" />)}
            </Form.Item>
            <Input prefix="L" />
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
            <Form.Item label="Password">
              {getFieldDecorator('password')(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
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
          Login
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

export default withAuth(BookForm);
