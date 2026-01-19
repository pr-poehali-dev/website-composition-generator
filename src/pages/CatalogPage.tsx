import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Смеситель для раковины хром',
    price: 4500,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/a08244ba-8256-4991-93be-e3301241a0bd.jpg',
    category: 'Смесители',
    description: 'Однорычажный смеситель с керамическим картриджем'
  },
  {
    id: 2,
    name: 'Раковина керамическая белая',
    price: 8900,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/48133cdb-c7d4-42e0-ae80-34093d47cd20.jpg',
    category: 'Раковины',
    description: 'Накладная раковина из санфаянса 60х40 см'
  },
  {
    id: 3,
    name: 'Душевая лейка тропический душ',
    price: 6500,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/f0bb65fb-5956-4935-b487-06257d6c4ed2.jpg',
    category: 'Душевые системы',
    description: 'Верхний душ с эффектом тропического дождя 25 см'
  },
  {
    id: 4,
    name: 'Унитаз подвесной',
    price: 12900,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/48133cdb-c7d4-42e0-ae80-34093d47cd20.jpg',
    category: 'Унитазы',
    description: 'Подвесной унитаз с системой безободкового смыва'
  },
  {
    id: 5,
    name: 'Смеситель для ванны с душем',
    price: 7200,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/a08244ba-8256-4991-93be-e3301241a0bd.jpg',
    category: 'Смесители',
    description: 'Двухрычажный смеситель с душевой лейкой и шлангом'
  },
  {
    id: 6,
    name: 'Ванна акриловая 170х70',
    price: 15900,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/48133cdb-c7d4-42e0-ae80-34093d47cd20.jpg',
    category: 'Ванны',
    description: 'Прямоугольная акриловая ванна с усиленным каркасом'
  },
  {
    id: 7,
    name: 'Душевая кабина угловая',
    price: 24900,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/f0bb65fb-5956-4935-b487-06257d6c4ed2.jpg',
    category: 'Душевые системы',
    description: 'Угловая душевая кабина 90хх90 см с поддоном'
  },
  {
    id: 8,
    name: 'Смеситель для кухни',
    price: 5800,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/a08244ba-8256-4991-93be-e3301241a0bd.jpg',
    category: 'Смесители',
    description: 'Кухонный смеситель с высоким изливом'
  },
  {
    id: 9,
    name: 'Раковина накладная круглая',
    price: 7800,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/48133cdb-c7d4-42e0-ae80-34093d47cd20.jpg',
    category: 'Раковины',
    description: 'Круглая накладная раковина диаметром 42 см'
  }
];

const categories = ['Все', 'Смесители', 'Раковины', 'Душевые системы', 'Унитазы', 'Ванны'];

interface CatalogPageProps {
  addToCart: (item: { id: number; name: string; price: number; image: string }) => void;
}

export default function CatalogPage({ addToCart }: CatalogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center animate-fade-in">
            Каталог товаров
          </h1>

          <div className="mb-8 animate-fade-in">
            <div className="relative max-w-xl mx-auto">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="text"
                placeholder="Поиск по названию или описанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-12 animate-fade-in">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="PackageX" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
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
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      <Button 
                        onClick={() => addToCart(product)}
                        className="rounded-full"
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}