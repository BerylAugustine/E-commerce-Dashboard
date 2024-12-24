import React, { useState } from 'react';
import { Input, Button, Form, InputNumber, Rate } from 'antd';
import axios from 'axios';
import '../CSS/CreateProduct.css';

export default function CreateProduct() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    ratings: 5,
    images: [],
    seller: '',
    stock: 1,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files; // Get selected files
    setProduct({ ...product, images: files }); // Store files in state  
    console.log(product)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);

    const { name, category, price, description, ratings, seller, stock, images } = product;

    // Create a FormData object
    const formData = new FormData();

    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('ratings', ratings);
    formData.append('seller', seller);
    formData.append('stock', stock);

    // Append all the images
    Array.from(images).forEach((image) => {
      formData.append('images', image); // Add each image to FormData
    });

    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/products',
        formData, // Send the FormData instead of a JSON object
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Correct header for file upload
          },
        }
      );

      if (res.status === 201) {
        alert('Product Created Successfully!');
        setProduct({
          name: '',
          category: '',
          price: '',
          description: '',
          ratings: 5,
          images: [],
          seller: '',
          stock: 1,
        });
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  };


  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Create New Product</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Product Name">
            <Input
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Category">
            <Input
              name="category"
              placeholder="Category"
              value={product.category}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Price">
            <InputNumber
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={(value) => setProduct({ ...product, price: value })}
            />
          </Form.Item>

          <Form.Item label="Description">
            <Input.TextArea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Images">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </Form.Item>

          <Form.Item label="Ratings">
            <Rate
              value={product.ratings}
              onChange={(value) => setProduct({ ...product, ratings: value })}
            />
          </Form.Item>

          <Form.Item label="Seller">
            <Input
              name="seller"
              placeholder="Seller"
              value={product.seller}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Stock">
            <InputNumber
              name="stock"
              placeholder="Stock"
              value={product.stock}
              onChange={(value) => setProduct({ ...product, stock: value })}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
