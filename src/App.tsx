import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import ContactsPage from './pages/ContactsPage';
import NotFound from "./pages/NotFound";
import Icon from '@/components/ui/icon';

const queryClient = new QueryClient();

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

function Navigation({ cartCount }: { cartCount: number }) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Icon name="Leaf" size={28} />
            <span className="font-montserrat">EcoShop</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Главная
            </Link>
            <Link 
              to="/catalog" 
              className={`transition-colors ${isActive('/catalog') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Каталог
            </Link>
            <Link 
              to="/contacts" 
              className={`transition-colors ${isActive('/contacts') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Контакты
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/profile" 
              className={`p-2 rounded-full transition-colors ${isActive('/profile') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              <Icon name="User" size={20} />
            </Link>
            <Link 
              to="/cart" 
              className={`relative p-2 rounded-full transition-colors ${isActive('/cart') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(i => i.id !== id));
    } else {
      setCart(prev => prev.map(i => 
        i.id === id ? { ...i, quantity } : i
      ));
    }
  };
  
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };
  
  const clearCart = () => setCart([]);
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <>
      <Navigation cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/catalog" element={<CatalogPage addToCart={addToCart} />} />
        <Route 
          path="/cart" 
          element={
            <CartPage 
              cart={cart} 
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          } 
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <AppContent />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
