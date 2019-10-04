import { Button, Modal, Form, Input, Select, Menu, Icon } from 'antd';
import withAuth from '../HOC/withAuth';
import React, { Fragment } from 'react';
const { Option } = Select;
const { Item } = Menu;

function handleChange(value) {
  getCategories();
}

const getCategories = () => {
  fetch('/api/category')
    .then(res => {
      if (res.status === 200) {
        const categories = res.json();
        console.log(categories);
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
    });
};

const addCategory = () => {
  fetch('/api/category')
    .then(res => {
      if (res.status === 200) {
        const categories = res.json();
        console.log(categories);
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
    });
};

const CategoryForm = Form.create({ name: 'form_in_modal' })(
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
          <Form layout="vertical">
            <Form.Item label="Category">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: 'Please enter title of category!' }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter description of Category'
                  }
                ]
              })(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class CategoryButton extends React.Component {
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
      // addCategory();

      fetch('/api/category/createCategory', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <Fragment>
        {!this.props.edit ? (
          <Button type="primary" onClick={this.showModal}>
            Edit Categories
          </Button>
        ) : (
          <Icon type="edit" onClick={this.showModal} />
        )}
        <CategoryForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </Fragment>
    );
  }
}

export default withAuth(CategoryButton);
