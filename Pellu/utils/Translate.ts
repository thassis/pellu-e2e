import { PetSize, PetType } from '../types/offer.type';
import { PostStatus } from '../types/post.type';

export const translatePetSize = (size: PetSize) => {
  switch (size) {
    case 'SMALL':
      return 'Pequeno';
    case 'MEDIUM':
      return 'Médio';
    case 'LARGE':
      return 'Grande';
    default:
      return 'Desconhecido';
  }
};

export const translatePetSizeToKey = (size: string) => {
  switch (size) {
    case 'Pequeno':
      return 'SMALL';
    case 'Médio':
      return 'MEDIUM';
    case 'Grande':
      return 'LARGE';
    default:
      return 'UNKNOWN';
  }
};

export const translateGender = (gender: 'F' | 'M') => {
  switch (gender) {
    case 'M':
      return 'Macho';
    case 'F':
    default:
      return 'Fêmea';
  }
};

export const translateGenderToKey = (gender: string) => {
  switch (gender) {
    case 'Macho':
      return 'M';
    case 'Fêmea':
    default:
      return 'F';
  }
};

export const translatePetType = (type: PetType) => {
  switch (type) {
    case 'DOG':
      return 'Cachorro';
    case 'CAT':
      return 'Gato';
    case 'OTHERS':
    default:
      return 'Outros';
  }
};

export const translatePetTypeToKey = (type: string) => {
  switch (type) {
    case 'Cachorro':
      return 'DOG';
    case 'Gato':
      return 'CAT';
    case 'Outros':
    default:
      return 'OTHERS';
  }
};

export const translateStatus = (status: PostStatus) => {
  switch (status) {
    case 'DELETED':
      return 'Removido';
    case 'MODERATED':
      return 'Moderado';
    case 'PUBLISHED':
      return 'Publicado';
    default:
      return 'Desconhecido';
  }
};
