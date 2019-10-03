import { Button, Modal, Form, Input,Select } from 'antd';
import React from 'react';
const { Option } = Select;
const withAuth = require('../HOC/withAuth');


function handleChange(value) {
  console.log(`selected ${value}`);
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Edit Categories"
          okText="Save"
          onCancel={onCancel}
          onOk={onCreate}
        >
           <Select defaultValue="New Category" style={{ width: 150 }} >
            <Option value="drama">Drama</Option>
            <Option value="science">Science</Option>
            <Option value="newCategory">New Category</Option>

    </Select>
          <Form layout="vertical">
            <Form.Item label="Category">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please enter title of category!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description',{rules: [{required:true,message: 'Please enter description of Category'}]})(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class CategoriesForm extends React.Component {
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
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
    
      <div>
        <Button type="primary" onClick={this.showModal}>
          Edit Categories 
       </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


// export default CategoriesForm;
export default withAuth(CategoriesForm);
