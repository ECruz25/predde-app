import { Button, Modal, Form, Input, Radio, Icon } from 'antd';
import React from 'react';

const LoginForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
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
            <Form.Item label="email">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the email!'
                  }
                ]
              })(<Input />)}
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
        <LoginForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default LoginButton;
