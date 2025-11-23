import {StateCreator} from 'zustand';
import {ParamsAddPetOffer} from '../types/offer.type';

export type NewPetOfferType =
  | (Partial<ParamsAddPetOffer> & {pictures?: string[]})
  | undefined;

export interface NewPetOfferSlice {
  newPetOffer: NewPetOfferType;
  setNewPetOffer: (args: NewPetOfferType) => void;
  cleanNewPetOffer: () => void;
}

export const createNewPetOfferSlice: StateCreator<NewPetOfferSlice> = set => ({
  newPetOffer: undefined,
  setNewPetOffer: (args: NewPetOfferType) =>
    set(() => ({newPetOffer: {...args}})),
  cleanNewPetOffer: () => set(() => ({newPetOffer: undefined})),
});
