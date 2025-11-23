export const PETS_PER_PAGE = 20;

export type PetType = 'CAT' | 'DOG' | 'OTHERS';

export type PetSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'UNKNOWN';

export type ParamsAddPetOffer = {
  userId: string;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  petType: PetType;
  size: PetSize;
  address: OfferAddress;
  phone: string;
  birthdate: number;
  gender: 'F' | 'M';
};

export type ParamsGetOffers = {
  page: number;
  latitude?: number;
  longitude?: number;
  petType?: PetType;
  userId?: string;
};

export type IOffer = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  pictures: string[];
  petType: PetType;
  user: {
    name: string;
    picture: string;
  };
  latitude: number;
  longitude: number;
  address: OfferAddress;
  size: PetSize;
  phone: string;
  birthdate: number;
  gender: 'F' | 'M';
};

export type OfferAddress = {
  neighborhood: string;
  city: string;
  state: string;
  street: string;
  number: string;
  zipCode: string;
  ibge: number;
};

export type ResGetOffers = IOffer[];
