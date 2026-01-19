import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Органическое мыло с лавандой',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/6f6c24ae-81bb-4a6d-ab01-a15752df5793.jpg',
    category: 'Уход за телом'
  },
  {
    id: 2,
    name: 'Натуральный крем для лица',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/b89f021a-f0ff-49be-8359-7892a06d2cc1.jpg',
    category: 'Уход за лицом'
  },
  {
    id: 3,
    name: 'Эко-набор косметики',
    price: 1590,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/36ea9bb3-323d-4285-b812-a7fba3ebcee0.jpg',
    category: 'Наборы'
  }
];

const benefits = [
  {
    icon: 'Leaf',
    title: '100% натуральные',
    description: 'Только органические ингредиенты без химии'
  },
  {
    icon: 'Heart',
    title: 'Забота о природе',
    description: 'Экологичная упаковка и производство'
  },
  {
    icon: 'Award',
    title: 'Сертифицировано',
    description: 'Международные сертификаты качества'
  },
  {
    icon: 'Truck',
    title: 'Быстрая доставка',
    description: 'Доставка по России за 2-5 дней'
  }
];

interface HomePageProps {
  addToCart: (item: { id: number; name: string; price: number; image: string }) => void;
}

export default function HomePage({ addToCart }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-secondary/20 via-background to-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Натуральная косметика для вашей красоты
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Откройте для себя силу природы с нашей коллекцией органической косметики. 
              Экологично, эффективно, этично.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="w-full sm:w-auto">
                  Перейти в каталог
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Популярные товары</h2>
            <p className="text-muted-foreground">Самые любимые продукты наших покупателей</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    <Button 
                      onClick={() => addToCart(product)}
                      className="rounded-full"
                    >
                      <Icon name="ShoppingCart" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button size="lg" variant="outline">
                Смотреть все товары
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-muted-foreground">Качество, которому доверяют тысячи покупателей</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon name={benefit.icon as any} size={32} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Присоединяйтесь к эко-движению
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Получите скидку 10% на первый заказ при подписке на нашу рассылку
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-full text-foreground"
            />
            <Button size="lg" variant="secondary" className="rounded-full">
              Подписаться
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
