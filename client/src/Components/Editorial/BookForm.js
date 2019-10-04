import { Button, Modal, Form, Input, Radio, Icon, Upload, Select } from 'antd';
import axios from 'axios';
import React, { Fragment } from 'react';
import withAuth from '../HOC/withAuth';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;

const BookForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      categories: [],
      image: {}
    };
    async componentDidMount() {
      const response = await fetch('api/category');
      const categoriesResponse = await response.json();
      this.setState({ categories: categoriesResponse });
    }

    render() {
      const {
        visible,
        onCancel,
        onCreate,
        form,
        onHandleImageChange,
        book,
        handleEditBook,
        isEditing
      } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title={isEditing ? book.name : 'Nuevo Libro'}
          okText="Guardar"
          onCancel={onCancel}
          onOk={isEditing ? handleEditBook : onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Nombre">
              {getFieldDecorator('name', {
                initialValue: book.name,
                rules: [
                  {
                    required: true,
                    message: 'Ingrese el nombre del libro'
                  }
                ]
              })(
                <Input
                  type="text"
                  placeholder="Nombre"
                  autocomplete="off"
                  id="name"
                />
              )}
            </Form.Item>
            <Form.Item label="Precio">
              {getFieldDecorator('price', {
                initialValue: book.price,
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
                  defaultValue={book.price}
                />
              )}
            </Form.Item>
            <Form.Item label="Imagen">
              {getFieldDecorator('upload')(
                <div
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
                >
                  <input
                    type="file"
                    name="file"
                    id="photo"
                    accept="image/gif, image/png, image/jpeg"
                    onChange={onHandleImageChange}
                    required
                  />
                  {book.image && !this.props.hasChangedImage && (
                    <img
                      alt="example"
                      src={`/books/${book.image}`}
                      style={{ height: 32, width: 32 }}
                    />
                  )}
                </div>
              )}
            </Form.Item>
            <Form.Item label="Categoria">
              {getFieldDecorator('category', {
                initialValue: book.category,
                rules: [
                  {
                    required: true,
                    message: 'Ingrese la categoria'
                  }
                ]
              })(
                <Select
                  defaultValue={book.category}
                  style={{ width: 150 }}
                  onChange={() => {}}
                >
                  {this.state.categories.map(category => (
                    <Option value={category._id} key={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Descripción">
              {getFieldDecorator('description', {
                initialValue: book.description,
                rules: [
                  {
                    required: true,
                    message: 'Porfavor incluya la descripción!'
                  }
                ]
              })(
                <TextArea
                  defaultValue={book.description}
                  placeholder="Descripción"
                  autocomplete="off"
                />
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
    visible: false,
    hasChangedImage: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onHandleImageChange = ({ target }) => {
    this.setState({ image: target.files[0], hasChangedImage: true });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const { image } = this.state;
    form.validateFields(async (err, { name, price, category, description }) => {
      if (err) {
        return;
      }
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('description', description);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios
        .post('/api/book/', formData, config)
        .then(response => {
          alert(`Se ha creado el libro: ${name}`);
          this.setState({ visible: false });
          form.resetFields();
        })
        .catch(error => {
          alert(error);
        });
    });
  };

  handleEditBook = () => {
    if (this.state.image) {
      this.handleEditBookImage();
      return;
    }
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
      const request = { ...values, id: this.props.book._id };
      axios
        .put('/api/book', request, config)
        .then(response => {
          alert(`Se ha modificado el libro: ${values.name}`);
          this.setState({ visible: false });
          form.resetFields();
        })
        .catch(error => {
          alert(error);
        });
    });
  };

  handleEditBookImage = () => {
    const { form } = this.formRef.props;
    const { image } = this.state;
    form.validateFields(async (err, { name, price, category, description }) => {
      if (err) {
        return;
      }
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('id', this.props.book._id);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios
        .put('/api/book/withImage', formData, config)
        .then(response => {
          alert(`Se ha modificado el libro: ${name}`);
          this.setState({ visible: false });
          form.resetFields();
        })
        .catch(error => {
          alert(error);
        });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        {this.props.showAsIcon ? (
          <Icon type="edit" key="edit" onClick={this.showModal} />
        ) : (
          <Button type="primary" onClick={this.showModal}>
            Agregar Libro
          </Button>
        )}
        {this.state.visible && (
          <BookForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            onHandleImageChange={this.onHandleImageChange}
            isEditing={this.props.isEditing}
            handleEditBook={this.handleEditBook}
            book={this.props.book || { name: '', price: 0, description: '' }}
            hasChangedImage={this.state.hasChangedImage}
          />
        )}
      </div>
    );
  }
}

export default withAuth(BookButton);
