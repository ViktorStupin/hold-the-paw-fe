import type { IMyPetCard } from '@/types/Pet';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IInitialState {
  myPets: IMyPetCard[];
}

interface IActionsState {
  setMyPets: (myPets: IMyPetCard[]) => void;
  clearMyPets: () => void;
}

interface IPetsState extends IInitialState, IActionsState {}

const initialState: IInitialState = {
  myPets: [],
};

const petsStore: StateCreator<
  IPetsState,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  ...initialState,

  setMyPets: (myPets) =>
    set((state) => {
      state.myPets = myPets;
    }),

  clearMyPets: () =>
    set((state) => {
      state.myPets = [];
    }),
});

const usePetsStore = create<IPetsState>()(immer(devtools(petsStore)));

export const getPetsState = () => usePetsStore.getState();


export { usePetsStore };
