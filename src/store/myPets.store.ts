import type { TMyPetCard } from '@/schemas/pet/pet.myCard.shema';
import { petsServices } from '@/utils/api/services/pets.services';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IInitialState {
  myPets: TMyPetCard[];
  isLoading: boolean;
  error: string;
}

interface IActionsState {
  fetchMyPets: () => Promise<void>;
  clearMyPets: () => void;
  setPets: (updater: (prev: TMyPetCard[]) => TMyPetCard[]) => void;
}

interface IPetsState extends IInitialState, IActionsState {}

const initialState: IInitialState = {
  myPets: [],
  isLoading: false,
  error: '',
};

const petsStore: StateCreator<
  IPetsState,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  ...initialState,

  fetchMyPets: async () => {
    set((state) => {
      state.isLoading = true;
      state.error = '';
    });
    try {
      const data = await petsServices.getMyPets();
      set((state) => {
        state.myPets = data;
      });
    } catch (error) {
      set((state) => {
        state.error = getServerErrorMessage(error);
      });
    } finally {
      set((state) => {
        state.isLoading = false;
      });
    }
  },

  clearMyPets: () =>
    set((state) => {
      state.myPets = [];
    }),

  setPets: (updater) =>
    set((state) => {
      state.myPets = updater(state.myPets);
    }),
});

const useMyPetsStore = create<IPetsState>()(immer(devtools(petsStore)));

export const getPetsState = () => useMyPetsStore.getState();
export { useMyPetsStore as usePetsStore };
