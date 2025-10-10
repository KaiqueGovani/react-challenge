import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import Toolbar from "./components/Toolbar";
import { getProducts } from "./services/productsService";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError('Failed to load products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingProduct(null);
    await fetchProducts();
  };

  const handleProductDeleted = (deletedId) => {
    setProducts(prev => prev.filter(p => p.id !== deletedId));
    setFilteredProducts(prev => prev.filter(p => p.id !== deletedId));
  };

  const handleFilter = (searchTerm, category) => {
    const filtered = products.filter((product) => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (category === "All" || product.category === category)
    );
    setFilteredProducts(filtered);
  };

  if (showForm) {
    return (
      <div className="App">
        <ProductForm 
          product={editingProduct}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      
      {error && <p className="error-message">{error}</p>}
      
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <>
          <Toolbar 
            products={products} 
            onAddProduct={handleAddProduct} 
            onEditFilter={handleFilter} 
          />
          <ProductTable 
            products={filteredProducts}
            onProductDeleted={handleProductDeleted}
            onProductEdit={handleEditProduct}
          />
        </>
      )}
    </div>
  );
}

export default App;
