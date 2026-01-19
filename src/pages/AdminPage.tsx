import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const initialCategories = ['Смесители', 'Раковины', 'Душевые системы', 'Унитазы', 'Ванны'];

const initialProducts: Product[] = [
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
    description: 'Накладная раковина из санфаянса 60×40 см'
  },
  {
    id: 3,
    name: 'Душевая лейка тропический душ',
    price: 6500,
    image: 'https://cdn.poehali.dev/projects/373e02e7-4370-44b1-a786-1b2a191623b0/files/f0bb65fb-5956-4935-b487-06257d6c4ed2.jpg',
    category: 'Душевые системы',
    description: 'Верхний душ с эффектом тропического дождя 25 см'
  }
];

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    image: '',
    category: categories[0],
    description: ''
  });
  
  const [newCategory, setNewCategory] = useState('');

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.description) {
      toast.error('Заполните все поля товара');
      return;
    }
    
    const product: Product = {
      ...newProduct,
      id: Date.now()
    };
    
    setProducts([...products, product]);
    toast.success('Товар добавлен успешно!');
    setNewProduct({
      name: '',
      price: 0,
      image: '',
      category: categories[0],
      description: ''
    });
    setIsAddProductOpen(false);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    toast.success('Товар обновлен успешно!');
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Товар удален');
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error('Введите название категории');
      return;
    }
    
    if (categories.includes(newCategory.trim())) {
      toast.error('Такая категория уже существует');
      return;
    }
    
    setCategories([...categories, newCategory.trim()]);
    toast.success('Категория добавлена!');
    setNewCategory('');
    setIsAddCategoryOpen(false);
  };

  const handleDeleteCategory = (category: string) => {
    const hasProducts = products.some(p => p.category === category);
    if (hasProducts) {
      toast.error('Нельзя удалить категорию с товарами');
      return;
    }
    
    setCategories(categories.filter(c => c !== category));
    toast.success('Категория удалена');
  };

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="Settings" size={32} className="text-primary" />
            <h1 className="text-4xl font-bold">Админ-панель</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" size={20} />
                  Товары
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{products.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Всего товаров</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FolderOpen" size={20} />
                  Категории
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{categories.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Активных категорий</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Популярность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">98%</div>
                <p className="text-sm text-muted-foreground mt-1">Средний рейтинг</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Управление товарами</CardTitle>
                  <Button onClick={() => setIsAddProductOpen(true)}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить товар
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="flex gap-4 p-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{product.category}</Badge>
                            <span className="font-bold text-primary">{product.price} ₽</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Icon name="Pencil" size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Управление категориями</CardTitle>
                  <Button onClick={() => setIsAddCategoryOpen(true)}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить категорию
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => {
                    const count = products.filter(p => p.category === category).length;
                    return (
                      <div 
                        key={category}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Icon name="FolderOpen" size={20} className="text-primary" />
                          <div>
                            <div className="font-semibold">{category}</div>
                            <div className="text-sm text-muted-foreground">
                              {count} {count === 1 ? 'товар' : 'товаров'}
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDeleteCategory(category)}
                          disabled={count > 0}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Добавить новый товар</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Название товара</Label>
              <Input
                placeholder="Смеситель для кухни"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Описание</Label>
              <Input
                placeholder="Описание товара"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Цена (₽)</Label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={newProduct.price || ''}
                  onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Категория</Label>
                <select
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>URL изображения</Label>
              <Input
                placeholder="https://..."
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              />
            </div>
            
            <Button onClick={handleAddProduct} className="w-full">
              Добавить товар
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Редактировать товар</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Название товара</Label>
                <Input
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Описание</Label>
                <Input
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Цена (₽)</Label>
                  <Input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Категория</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>URL изображения</Label>
                <Input
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                />
              </div>
              
              <Button onClick={handleUpdateProduct} className="w-full">
                Сохранить изменения
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить категорию</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Название категории</Label>
              <Input
                placeholder="Аксессуары"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
            <Button onClick={handleAddCategory} className="w-full">
              Добавить категорию
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
