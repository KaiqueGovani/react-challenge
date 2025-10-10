import { useState } from 'react';
import { deleteProduct } from '../services/productsService';

function ProductTable({ products, onProductDeleted, onProductEdit }) {
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    setDeletingId(id);
    setError(null);
    try {
      await deleteProduct(id);
      if (onProductDeleted) {
        onProductDeleted(id);
      }
    } catch (err) {
      setError('Failed to delete product: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h2>No products found</h2>
        <p>Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      {error && <p className="error-message">{error}</p>}
      
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>{product.rating.toFixed(1)}</td>
              <td>
                <div className="action-buttons">
                  <button 
                    onClick={() => onProductEdit && onProductEdit(product)}
                    className="edit-btn"
                    disabled={deletingId === product.id}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="delete-btn"
                    disabled={deletingId === product.id}
                  >
                    {deletingId === product.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;