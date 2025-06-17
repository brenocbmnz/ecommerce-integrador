import React, { useState, useMemo, useEffect } from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ShoppingCart from './components/cart/ShoppingCart';

import HomePage from './components/pages/HomePage';
import ShopPage from './components/pages/ShopPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import ProductDetailPage from './components/pages/ProductDetailPage';

import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorMessage from './components/UI/ErrorMessage';


export default function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState({ page: 'home', product: null });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        if (!response.ok) {
          throw new Error('Data could not be fetched! Please ensure the backend server is running.');
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

    fetchProducts();
  }, []);

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


  const handleNavigate = (page) => {
    console.log('App received navigation request to:', page);
    // Force a re-render by setting loading state briefly
    setIsLoading(true);
    setTimeout(() => {
      setCurrentView({ page, product: null });
      setIsLoading(false);
    }, 10);
  };

  const navigateToProduct = (product) => {
    setCurrentView({ page: 'product', product });
  };

  const navigateToShop = () => {
    setCurrentView({ page: 'shop', product: null });
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error && products.length === 0) {
      return <ErrorMessage message={error} />;
    }

    const { page, product } = currentView;
    console.log('Rendering page:', page);

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
        return product ?
          <ProductDetailPage product={product} onAddToCart={handleAddToCart} onBack={navigateToShop} /> :
          <ErrorMessage message="Product not found" />;
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