import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartPageProps {
  cart: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export default function CartPage({ cart, updateQuantity, removeFromCart, clearCart }: CartPageProps) {
  const { toast } = useToast();
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 2000 ? 0 : 300;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    toast({
      title: "Заказ оформлен!",
      description: `Ваш заказ на сумму ${total} ₽ принят в обработку.`,
    });
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-16 animate-fade-in">
          <Icon name="ShoppingCart" size={80} className="mx-auto text-muted-foreground mb-6" />
          <h2 className="text-3xl font-bold mb-4">Корзина пуста</h2>
          <p className="text-muted-foreground mb-8">Добавьте товары из каталога</p>
          <Link to="/catalog">
            <Button size="lg">
              Перейти в каталог
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 animate-fade-in">Корзина</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-primary font-bold">{item.price} ₽</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 animate-fade-in">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Итого</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Товары ({cart.length})</span>
                      <span className="font-medium">{subtotal} ₽</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доставка</span>
                      <span className="font-medium">
                        {delivery === 0 ? (
                          <span className="text-primary">Бесплатно</span>
                        ) : (
                          `${delivery} ₽`
                        )}
                      </span>
                    </div>
                  </div>
                  
                  {subtotal < 2000 && (
                    <div className="bg-secondary/50 p-3 rounded-lg mb-4 text-sm">
                      <Icon name="Info" size={16} className="inline mr-2" />
                      Бесплатная доставка от 2000 ₽
                    </div>
                  )}
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Всего</span>
                    <span className="text-primary">{total} ₽</span>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Оформить заказ
                  </Button>
                  
                  <Link to="/catalog">
                    <Button 
                      variant="outline" 
                      className="w-full mt-3"
                    >
                      Продолжить покупки
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
