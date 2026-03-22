import type { TUser } from '@/types/User';
import { profileServices } from '@/utils/api/services/profile.services';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IInitialState {
  user: null | TUser;
  isLoading: boolean;
  error: string;
}

interface IActionsState {
  fetchMe: () => Promise<void>;
  clearMyPets: () => void;
  updateMe: (data: TUser) => Promise<void>;
}

interface IUserState extends IInitialState, IActionsState {}

const initialState: IInitialState = {
  user: null,
  isLoading: false,
  error: '',
};

const userStore: StateCreator<
  IUserState,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  ...initialState,

  fetchMe: async () => {
    set((state) => {
      state.isLoading = true;
      state.error = '';
    });
    try {
      const data = await profileServices.getMe();
      set((state) => {
        state.user = data;
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
      state.user = null;
    }),

  updateMe: async (data: TUser) => {
    set((state) => {
      state.isLoading = true;
      state.error = '';
    });
    try {
      const updated = await profileServices.updateMe(data);
      set((state) => {
        state.user = updated;
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
});

const useUserStore = create<IUserState>()(immer(devtools(userStore)));

export const getUserState = () => useUserStore.getState();
export { useUserStore };
