import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const Login = ({ form: { getFieldDecorator } }) => {
  const onSubmit = e => {
    e.preventDefault();
    form.validateFields((err, val) => {
      if (!err) {
      }
    });
  };
  return (
    <Form onSubmit={onSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default Login;
