import React, { useState, useMemo, useEffect } from 'react';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ShoppingCart from './components/cart/ShoppingCart';

// Page Components
import HomePage from './components/pages/HomePage';
import ShopPage from './components/pages/ShopPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import AdminPage from './components/pages/AdminPage'; // Importe a nova página de admin

// UI Components
import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorMessage from './components/UI/ErrorMessage';


export default function App() {
  // --- State Management ---
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState({ page: 'home', product: null });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    // Apenas busca produtos se não estivermos na página de admin,
    // pois a página de admin busca seus próprios dados.
    if (currentView.page !== 'admin') {
      fetchProducts();
    }
  }, [currentView.page]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/products');
      if (!response.ok) {
        throw new Error('Os dados não puderam ser buscados! Verifique se o backend está rodando.');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
      // Use fallback data if fetch fails
      setProducts(require('./components/data/products').default);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Cart Management Functions ---
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(prevCart => prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);


  // --- View Navigation Functions ---
  const handleNavigate = (page) => {
    setCurrentView({ page, product: null });
  };

  const navigateToProduct = (product) => {
    setCurrentView({ page: 'product', product });
  };

  const navigateToShop = () => {
    setCurrentView({ page: 'shop', product: null });
  };

  // --- Router Logic ---
  const renderContent = () => {
    // Não mostramos o spinner global para a página de admin, pois ela gerencia seu próprio estado de loading.
    if (isLoading && currentView.page !== 'admin') {
      return <LoadingSpinner />;
    }
    // O erro só é mostrado se não houver produtos de fallback
    if (error && products.length === 0) {
      return <ErrorMessage message={error} />;
    }

    const { page, product } = currentView;
    switch (page) {
      case 'home':
        return <HomePage products={products} onAddToCart={handleAddToCart} onProductClick={navigateToProduct} />;
      case 'shop':
        return <ShopPage products={products} onAddToCart={handleAddToCart} onProductClick={navigateToProduct} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'product':
        return <ProductDetailPage product={product} onAddToCart={handleAddToCart} onBack={navigateToShop} />;
      case 'admin': // Adicione o case para a página de admin
        return <AdminPage />;
      default:
        return <HomePage products={products} onAddToCart={handleAddToCart} onProductClick={navigateToProduct} />;
    }
  };

  return (
    <div className="bg-gray-50 font-sans flex flex-col min-h-screen">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
      />
      {/* Link temporário para a área de admin no topo da página */}
      <div className="bg-yellow-200 text-center p-2">
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('admin'); }} className="text-yellow-800 font-bold">
          Acessar Painel de Administrador
        </a>
      </div>

      <main className="flex-grow">
        {renderContent()}
      </main>
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      />
      <Footer />
    </div>
  );
}

