import { Product } from './Product';

export enum ShopType {
  Services = 'services',
  Food = 'food',
}

export type Shop = {
  id: number;
  name: string;
  address: string;
  minimumOrder: number;
  rating: number;
  quantityRating: number;
  image: string;
  zipCode: string;
  city: string;
  products: Product[];
  type: ShopType;
  categories: string[];
};

export const shopMock: Shop = {
  id: 1,
  name: 'Bar do Igor',
  address: 'Rua Rio Grande do Norte, 123, Savassi - BH, Minas Gerais - Brasil',
  zipCode: '30190-060',
  city: 'Belo Horizonte',
  minimumOrder: 20,
  rating: 4.5,
  quantityRating: 100,
  image: 'https://picsum.photos/200/300',
  type: ShopType.Food,
  categories: ['Bar', 'Pizzaria', 'Restaurante'],
  products: [
    {
      id: 1,
      options: [
        { extraPrice: 0, name: 'tradicional' },
        { extraPrice: 550, name: '4 queijos' },
        { extraPrice: 550, name: '8 queijos' },
        { extraPrice: 1400, name: 'cogumelos ao alho' },
        { extraPrice: 0, name: 'normal' },
        { extraPrice: 1400, name: 'cogumelos' },
      ],
      image:
        'https://lh3.googleusercontent.com/p/AF1QipOuaWkZijcbr-cqjPNz1xpFa0l5niONsp1bljws=w1080-h608-p-no-v0',
      name: 'Cerveja Skoll',
      description:
        'Cerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsum',
      price: 1549,
    },
    {
      id: 2,
      image:
        'https://lh3.googleusercontent.com/p/AF1QipOuaWkZijcbr-cqjPNz1xpFa0l5niONsp1bljws=w1080-h608-p-no-v0',
      name: 'Cerveja Skoll',
      description:
        'Cerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsum',
      price: 1049,
    },
    {
      id: 3,
      image:
        'https://lh3.googleusercontent.com/p/AF1QipOuaWkZijcbr-cqjPNz1xpFa0l5niONsp1bljws=w1080-h608-p-no-v0',
      name: 'Cerveja Skoll',
      description:
        'Cerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsum',
      price: 1549,
    },
    {
      id: 4,
      image:
        'https://lh3.googleusercontent.com/p/AF1QipOuaWkZijcbr-cqjPNz1xpFa0l5niONsp1bljws=w1080-h608-p-no-v0',
      name: 'Cerveja Skoll',
      description:
        'Cerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsum',
      price: 1049,
    },
    {
      id: 5,
      image:
        'https://lh3.googleusercontent.com/p/AF1QipOuaWkZijcbr-cqjPNz1xpFa0l5niONsp1bljws=w1080-h608-p-no-v0',
      name: 'Cerveja Skoll',
      description:
        'Cerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsum',
      price: 1549,
    },
    {
      id: 6,
      image:
        'https://lh3.googleusercontent.com/p/AF1QipOuaWkZijcbr-cqjPNz1xpFa0l5niONsp1bljws=w1080-h608-p-no-v0',
      name: 'Cerveja Skoll',
      description:
        'Cerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsumCerveja skoll latão lore ipsum',
      price: 1049,
    },
  ],
};
