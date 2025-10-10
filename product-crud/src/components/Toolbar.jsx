import { useState } from 'react';

function Toolbar({ products, onAddProduct, onEditFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onEditFilter(value, category);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onEditFilter(searchTerm, value);
  };

  return (
    <div className="toolbar">
      <div className="search-box">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <select 
        value={category} 
        onChange={handleCategoryChange}
        className="category-select"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <button onClick={onAddProduct} className="add-button">
        Add Product
      </button>
    </div>
  );
}

export default Toolbar;