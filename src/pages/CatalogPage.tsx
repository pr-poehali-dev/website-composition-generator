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
    name: 'Органическое мыло с лавандой',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/6f6c24ae-81bb-4a6d-ab01-a15752df5793.jpg',
    category: 'Уход за телом',
    description: 'Натуральное мыло ручной работы с эфирным маслом лаванды'
  },
  {
    id: 2,
    name: 'Натуральный крем для лица',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/b89f021a-f0ff-49be-8359-7892a06d2cc1.jpg',
    category: 'Уход за лицом',
    description: 'Увлажняющий крем с гиалуроновой кислотой и алоэ вера'
  },
  {
    id: 3,
    name: 'Эко-набор косметики',
    price: 1590,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/36ea9bb3-323d-4285-b812-a7fba3ebcee0.jpg',
    category: 'Наборы',
    description: 'Подарочный набор из 5 органических средств для ухода'
  },
  {
    id: 4,
    name: 'Шампунь с кокосовым маслом',
    price: 650,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/b89f021a-f0ff-49be-8359-7892a06d2cc1.jpg',
    category: 'Уход за волосами',
    description: 'Восстанавливающий шампунь для всех типов волос'
  },
  {
    id: 5,
    name: 'Бальзам для губ с пчелиным воском',
    price: 290,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/36ea9bb3-323d-4285-b812-a7fba3ebcee0.jpg',
    category: 'Уход за губами',
    description: 'Питательный бальзам с натуральным воском и маслами'
  },
  {
    id: 6,
    name: 'Скраб для тела с кофе',
    price: 550,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/6f6c24ae-81bb-4a6d-ab01-a15752df5793.jpg',
    category: 'Уход за телом',
    description: 'Отшелушивающий скраб с молотым кофе и маслом ши'
  },
  {
    id: 7,
    name: 'Сыворотка с витамином С',
    price: 1290,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/b89f021a-f0ff-49be-8359-7892a06d2cc1.jpg',
    category: 'Уход за лицом',
    description: 'Осветляющая сыворотка для сияния кожи'
  },
  {
    id: 8,
    name: 'Маска для волос с арганой',
    price: 790,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/36ea9bb3-323d-4285-b812-a7fba3ebcee0.jpg',
    category: 'Уход за волосами',
    description: 'Интенсивная восстанавливающая маска с аргановым маслом'
  },
  {
    id: 9,
    name: 'Дезодорант с алоэ',
    price: 420,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/6f6c24ae-81bb-4a6d-ab01-a15752df5793.jpg',
    category: 'Уход за телом',
    description: 'Натуральный дезодорант без алюминия и парабенов'
  }
];

const categories = ['Все', 'Уход за лицом', 'Уход за телом', 'Уход за волосами', 'Уход за губами', 'Наборы'];

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
