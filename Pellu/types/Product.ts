export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  options?: ProductOption[];
};

export type ProductOption = {
  extraPrice: number;
  name: string;
};
