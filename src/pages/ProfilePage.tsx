import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const orderHistory = [
  {
    id: 1,
    date: '15.01.2024',
    status: 'Доставлен',
    total: 2340,
    items: 3
  },
  {
    id: 2,
    date: '02.01.2024',
    status: 'В пути',
    total: 1890,
    items: 2
  },
  {
    id: 3,
    date: '20.12.2023',
    status: 'Доставлен',
    total: 890,
    items: 1
  }
];

export default function ProfilePage() {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: 'Анна Иванова',
    email: 'anna@example.com',
    phone: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Ленина, д. 10, кв. 25'
  });

  const handleSaveProfile = () => {
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные успешно сохранены",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Доставлен': return 'text-primary';
      case 'В пути': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
              АИ
            </div>
            <div>
              <h1 className="text-3xl font-bold">Личный кабинет</h1>
              <p className="text-muted-foreground">{profileData.email}</p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="animate-fade-in">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="orders">
                <Icon name="Package" size={18} className="mr-2" />
                Заказы
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Личные данные</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес доставки</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    />
                  </div>

                  <Button onClick={handleSaveProfile} className="w-full">
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Бонусная программа</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Накоплено баллов</p>
                      <p className="text-3xl font-bold text-primary">450</p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Award" size={32} className="text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    1 балл = 1 рубль скидки при следующей покупке
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>История заказов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order, index) => (
                      <div key={order.id}>
                        {index > 0 && <Separator className="my-4" />}
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold mb-1">Заказ #{order.id}</p>
                            <p className="text-sm text-muted-foreground mb-2">{order.date}</p>
                            <p className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{order.total} ₽</p>
                            <p className="text-sm text-muted-foreground">
                              {order.items} {order.items === 1 ? 'товар' : 'товара'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
