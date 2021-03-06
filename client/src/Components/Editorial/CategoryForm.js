import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Menu,
  Icon,
  Divider,
  Popconfirm
} from 'antd';
import withAuth from '../HOC/withAuth';
import React, { Fragment } from 'react';
const { Option } = Select;

const CategoryForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible,
        onCancel,
        onCreate,
        form,
        onChangeCategory,
        category,
        onDelete
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Edit Categories"
          okText="Save"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Select
            defaultValue="00"
            style={{ width: 150 }}
            onChange={onChangeCategory}
          >
            {this.props.categories.map(category => (
              <Option value={category._id} key={category._id}>
                {category.name}
              </Option>
            ))}
            <Option value="00">AGREGAR NUEVA CAT</Option>
          </Select>

          <Form layout="vertical">
            <Form.Item label="Category">
              {getFieldDecorator('name', {
                initialValue: category.name,
                rules: [
                  { required: true, message: 'Please enter title of category!' }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description', {
                initialValue: category.description,
                rules: [
                  {
                    required: true,
                    message: 'Please enter description of Category'
                  }
                ]
              })(<Input type="textarea" />)}
            </Form.Item>
            <Popconfirm
              disabled={category.name === ''}
              onConfirm={onDelete}
              placement="bottom"
              title={'Desea eliminar categoria?'}
              okText="Yes"
              cancelText="No"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            >
              <Button disabled={category.name === ''}>
                Eliminar Categoria
              </Button>
            </Popconfirm>
          </Form>
        </Modal>
      );
    }
  }
);

class CategoryButton extends React.Component {
  state = {
    visible: false,
    selectedCategory: {
      name: ''
    },

    categories: []
  };

  async componentDidMount() {
    this.getCategory();
  }

  async getCategory() {
    const response = await fetch('api/category');
    const categoriesResponse = await response.json();
    this.setState({ categories: categoriesResponse });
  }

  addCategory = values => {
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
  };

  deleteCategory = () => {
    fetch('/api/category/deleteCategory', {
      method: 'PUT',
      body: JSON.stringify(this.state.selectedCategory),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  };

  editCategory = values => {
    fetch('/api/category/updateCategory', {
      method: 'PUT',
      body: JSON.stringify({ ...this.state.selectedCategory, ...values }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleChangeCategory = value => {
    this.setState({
      selectedCategory: this.state.categories.filter(
        category => category._id === value
      )[0] || { name: '', description: '', _id: '', __v: '' }
    });
  };

  handleDelete = () => {
    this.deleteCategory();
    this.setState({ visible: false });
    this.getCategory();
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      if (!this.state.selectedCategory._id) {
        console.log('crear');
        this.addCategory(values);
      }
      if (this.state.selectedCategory._id) {
        console.log('editar');
        this.editCategory(values);
      }
      form.resetFields();
      this.setState({ visible: false });
      this.getCategory();
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
          onChangeCategory={this.handleChangeCategory}
          onDelete={this.handleDelete}
          categories={this.state.categories}
          category={this.state.selectedCategory}
        />
      </Fragment>
    );
  }
}

export default withAuth(CategoryButton);
