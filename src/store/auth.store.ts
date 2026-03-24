// store/auth.store.ts
import { create, type StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { jwtDecode } from 'jwt-decode';

interface IInitialState {
  accessToken: string | null;
  refreshToken: string | null;
  refreshTokenExpiresAt: number | null;
  userId: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  returnURL: string | null;
}

interface IActionsState {
  setTokens: (access: string, refresh: string) => void;
  setLoading: (value: boolean) => void;
  setReturnUrl: (url: string | null) => void;
  logout: () => void;
}

interface IAuthState extends IInitialState, IActionsState {}

const initialState: IInitialState = {
  accessToken: null,
  refreshToken: null,
  refreshTokenExpiresAt: null,
  userId: null,
  isAuthenticated: false,
  isLoading: false,
  returnURL: null,
};

interface IJwtPayload {
  user_id: number;
}

const authStore: StateCreator<
  IAuthState,
  [['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
  ...initialState,

  setTokens: (access, refresh) =>
    set((state) => {
      const { user_id } = jwtDecode<IJwtPayload>(access);
      state.userId = Number(user_id);
      state.accessToken = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.refreshTokenExpiresAt = Date.now() + 7 * 60 * 60 * 1000;
    }),

  setLoading: (value) =>
    set((state) => {
      state.isLoading = value;
    }),

  setReturnUrl: (url) =>
    set((state) => {
      state.returnURL = url;
    }),

  logout: () =>
    set((state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.refreshTokenExpiresAt = null;
      state.userId = null;
      state.returnURL = null;
    }),
});

export const useAuthStore = create<IAuthState>()(
  immer(
    devtools(
      persist(authStore, {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          refreshToken: state.refreshToken,
          refreshTokenExpiresAt: state.refreshTokenExpiresAt,
          isAuthenticated: state.isAuthenticated,
          userId: state.userId,
        }),
      })
    )
  )
);

export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
export const getAuthState = () => useAuthStore.getState();
export const setTokens = (a: string, r: string) => useAuthStore.getState().setTokens(a, r);
export const logout = () => useAuthStore.getState().logout();
export const setLoading = (value: boolean)=> useAuthStore.getState().setLoading(value);