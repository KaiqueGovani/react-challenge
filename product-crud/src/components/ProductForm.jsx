import { useState } from 'react';
import { createProduct, updateProduct } from '../services/productsService';

function ProductForm({ product, onCancel, onSuccess }) {
  const isEditing = !!product;
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    stock: product?.stock || '',
    rating: product?.rating || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate and convert types
      const productData = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        rating: parseFloat(formData.rating)
      };

      // Basic validation
      if (!productData.name || !productData.category) {
        throw new Error('Name and category are required');
      }
      if (isNaN(productData.price) || productData.price < 0) {
        throw new Error('Price must be a valid positive number');
      }
      if (isNaN(productData.stock) || productData.stock < 0) {
        throw new Error('Stock must be a valid positive number');
      }
      if (isNaN(productData.rating) || productData.rating < 0 || productData.rating > 5) {
        throw new Error('Rating must be between 0 and 5');
      }

      if (isEditing) {
        await updateProduct(product.id, productData);
      } else {
        await createProduct(productData);
      }
      
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="e.g., Wireless Mouse"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="e.g., Accessories"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              disabled={loading}
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              disabled={loading}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (0-5) *</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              disabled={loading}
              step="0.1"
              min="0"
              max="5"
              placeholder="0.0"
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={onCancel} 
            className="cancel-btn"
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;