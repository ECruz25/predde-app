import { Button, Modal, Form, Input, Radio, Icon,Checkbox, Layout, Divider, Select } from 'antd';
import React from 'react';
import Title from 'antd/lib/typography/Title';
const {  Content,  } = Layout;
const { TextArea } = Input;
const Option = Select.Option;


class ContactMeForm extends React.Component {
  state = {
    email: '',
    phone:'',
    message:'',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  
  render() {
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '504',
    })(
      <Select style={{ width: 90 }}>
        <Option value="504">+504</Option>
        <Option value="503">+503</Option>
      </Select>
    );
    return (
        <Layout style={{margin:'auto',minWidth:500,borderRadius:'1em'}}>
          <Content style={{margin:'2em'}}>
        <Title level={3}>Contact Us</Title><Divider style={{background:'#1890ff'}}></Divider>
      <Form onSubmit={this.handleSubmit} layout='vertical'>
      <Form.Item > {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your Email!' },{type: 'email', message: 'The input is not valid E-mail!',
          }],
          })(
            <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email Address"
          /> 
          )}
          
      </Form.Item>
      <Form.Item>
      {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' },
          ],
          })(
            <Input addonBefore={prefixSelector}
            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)'}} />}
            placeholder="Phone"
          />
          )}
          
      </Form.Item>
      <Form.Item>
      {getFieldDecorator('message', {
            rules: [{ required: true, message: 'Please input your message!' }],
          })(
            <TextArea  placeholder="Message" autosize={{ minRows: 2, maxRows: 6 }}/>
          )}
     
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Contact Me
        </Button>
      </Form.Item>
    </Form>
    </Content>
    </Layout>
    );
  }
}

export default Form.create()(ContactMeForm)