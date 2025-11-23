import {PetSize, PetType} from './offer.type';

export type IPet = IPetWithoutVaccines & {
  vaccines: IVaccine[];
};

export type IPetWithoutVaccines = {
  _id: string;
  userId: string;
  cip: string;
  name: string;
  petType: PetType;
  breed: string;
  color: string;
  birthdate: number;
  gender: 'F' | 'M';
  picture: string;
  user: {
    name: string;
    picture: string;
  };
  size: PetSize;
};

export type IVaccine = {
  _id: string;
  name: string;
  date: number;
};

export type ResGetPets = IPetWithoutVaccines[];

export type ParamsAddPet = {
  name: string;
  petType: string;
  breed: string;
  color: string;
  birthdate: number;
  size: PetSize;
  gender: 'F' | 'M';
};

export type ResGetPet = IPet;

export type ParamsAddVaccine = {
  name: string;
  date: number;
};
