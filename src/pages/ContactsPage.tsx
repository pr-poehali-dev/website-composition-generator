import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function ContactsPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contacts = [
    {
      icon: 'MapPin',
      title: 'Адрес',
      content: 'г. Москва, ул. Экологическая, д. 15'
    },
    {
      icon: 'Phone',
      title: 'Телефон',
      content: '+7 (495) 123-45-67'
    },
    {
      icon: 'Mail',
      title: 'Email',
      content: 'info@ecoshop.ru'
    },
    {
      icon: 'Clock',
      title: 'Режим работы',
      content: 'Пн-Вс: 9:00 - 21:00'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами удобным способом
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {contacts.map((contact, index) => (
                  <Card 
                    key={index}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                        <Icon name={contact.icon as any} size={24} />
                      </div>
                      <h3 className="font-semibold mb-1">{contact.title}</h3>
                      <p className="text-sm text-muted-foreground">{contact.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="animate-fade-in">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Мы в социальных сетях</h3>
                  <div className="flex gap-3">
                    {[
                      { name: 'Instagram', icon: 'Instagram' },
                      { name: 'Facebook', icon: 'Facebook' },
                      { name: 'Twitter', icon: 'Twitter' },
                      { name: 'Youtube', icon: 'Youtube' }
                    ].map((social) => (
                      <button
                        key={social.name}
                        className="w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center"
                      >
                        <Icon name={social.icon as any} size={20} />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-secondary/20 animate-fade-in">
                <CardContent className="p-6">
                  <Icon name="Leaf" size={40} className="text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Экологичная доставка</h3>
                  <p className="text-sm text-muted-foreground">
                    Мы используем электротранспорт и биоразлагаемую упаковку для доставки ваших заказов
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ваше имя"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="О чем хотите спросить?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ваше сообщение..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Отправить сообщение
                    <Icon name="Send" size={18} className="ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
