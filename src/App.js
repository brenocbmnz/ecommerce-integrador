import React, { useState, useMemo, useEffect } from 'react';

// Componentes de Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ShoppingCart from './components/cart/ShoppingCart';

// Componentes de Página
import HomePage from './components/pages/HomePage';
import ShopPage from './components/pages/ShopPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import AdminPage from './components/pages/AdminPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import CheckoutPage from './components/pages/CheckoutPage';
import OrderConfirmationPage from './components/pages/OrderConfirmationPage';

// Componentes de UI
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
  const [user, setUser] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    fetchProducts();
  }, []);

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
      setProducts(require('./components/data/products').default);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Funções de Autenticação ---
  const handleLogin = (data) => {
    setUser(data.user);
    localStorage.setItem('token', data.token);
    if (data.user.role === 'admin') {
      handleNavigate('admin');
    } else {
      handleNavigate('home');
    }
  };

  const handleRegister = (data) => {
    setUser(data.user);
    localStorage.setItem('token', data.token);
    handleNavigate('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    handleNavigate('home');
  };

  // --- Funções do Carrinho ---
  const handleAddToCart = (product) => {
    const itemInCart = cart.find(item => item.id === product.id);
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;

    if (quantityInCart >= product.stock) {
      alert(`Desculpe, temos apenas ${product.stock} unidades de "${product.name}" em estoque.`);
      return;
    }

    setCart(prevCart => {
      if (itemInCart) {
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
    const product = products.find(p => p.id === productId);
    if (newQuantity > product.stock) {
      alert(`Desculpe, temos apenas ${product.stock} unidades em estoque.`);
      return;
    }

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


  // --- Função de Compra ---
  const handleConfirmPurchase = async () => {
    if (!user) {
      alert('Por favor, faça o login para finalizar a compra.');
      handleNavigate('login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cart, userId: user.id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Falha ao finalizar a compra.');
      }

      const orderData = await response.json();
      setLastOrder(orderData);
      setCart([]);
      handleNavigate('order-confirmation');
      fetchProducts();

    } catch (err) {
      alert(`Erro: ${err.message}`);
    }
  };


  // --- Funções de Navegação ---
  const handleNavigate = (page) => {
    setCurrentView({ page, product: null });
  };

  const handleGoToCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    handleNavigate('checkout');
  };

  const navigateToProduct = (product) => {
    setCurrentView({ page: 'product', product });
  };

  const navigateToShop = () => {
    setCurrentView({ page: 'shop', product: null });
  };

  // --- Lógica do Roteador ---
  const renderContent = () => {
    if (isLoading && currentView.page !== 'admin') {
      return <LoadingSpinner />;
    }
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
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onRegister={handleRegister} onNavigate={handleNavigate} />;
      case 'admin':
        return user && user.role === 'admin'
          ? <AdminPage onProductsChange={fetchProducts} />
          : <HomePage products={products} onAddToCart={handleAddToCart} onProductClick={navigateToProduct} />;
      case 'checkout':
        return <CheckoutPage cartItems={cart} user={user} onConfirmPurchase={handleConfirmPurchase} onNavigate={handleNavigate} />;
      case 'order-confirmation':
        return <OrderConfirmationPage order={lastOrder} onNavigate={handleNavigate} />;
      default:
        return <HomePage products={products} onAddToCart={handleAddToCart} onProductClick={navigateToProduct} />;
    }
  };

  return (
    <div className="bg-gray-50 font-sans flex flex-col min-h-screen">
      <Header
        user={user}
        onLogout={handleLogout}
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
        onGoToCheckout={handleGoToCheckout}
      />
      <Footer />
    </div>
  );
}
