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
  toggleActive: (id: number) => Promise<void>;
  setHelped: (id: number, status: boolean) => Promise<void>;
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

  toggleActive: async (id: number) => {
    const pet = usePetsStore.getState().myPets.find((p) => p.id === id);
    if (!pet) return;

    set((state) => {
      const target = state.myPets.find((p) => p.id === id);
      if (!target) return;
      target.is_active = !target.is_active;
      if (target.is_active) {
        target.is_helped = false;
      }
    });

    try {
      await petsServices.toggleActive(pet.is_active, id);
    } catch (error) {
      set((state) => {
        const target = state.myPets.find((p) => p.id === id);
        if (!target) return;
        target.is_active = pet.is_active;
        target.is_helped = pet.is_helped;
      });
      set((state) => {
        state.error = getServerErrorMessage(error);
      });
    }
  },

  setHelped: async (id: number, status: boolean) => {
    const pet = usePetsStore.getState().myPets.find((p) => p.id === id);
    if (!pet) return;

    set((state) => {
      const target = state.myPets.find((p) => p.id === id);
      if (!target) return;
      target.is_helped = status;
    });

    try {
      await petsServices.toggleHelped(status, id);
    } catch (error) {
      set((state) => {
        const target = state.myPets.find((p) => p.id === id);
        if (!target) return;
        target.is_helped = pet.is_helped;
      });
      set((state) => {
        state.error = getServerErrorMessage(error);
      });
    }
  },
});

const usePetsStore = create<IPetsState>()(immer(devtools(petsStore)));

export const getPetsState = () => usePetsStore.getState();
export { usePetsStore };
