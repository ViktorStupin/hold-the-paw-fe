import { create, type StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IInitialState {
  accessToken: string | null;
  refreshToken: string | null;
  refreshTokenExpiresAt: number | null;
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
  isAuthenticated: false,
  isLoading: false,
  returnURL: null,
};

const authStore: StateCreator<
  IAuthState,
  [['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
  ...initialState,

  setTokens: (access, refresh) =>
    set(
      (state) => {
        state.accessToken = access;
        state.refreshToken = refresh;
        state.isAuthenticated = true;
        state.refreshTokenExpiresAt = Date.now() + 7 * 60 * 60 * 1000;
      },
      false,
      'auth/setTokens'
    ),
  setLoading: (value) =>
    set(
      (state) => {
        state.isLoading = value;
      },
      false,
      'auth/setLoading'
    ),
  setReturnUrl: (url) =>
    set(
      (state) => {
        state.returnURL = url;
      },
      false,
      'auth/setReturnUrl'
    ),

  logout: () => {
    set(
      (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.refreshTokenExpiresAt = null;
      },
      false,
      'auth/logout'
    );
  },
});

const useAuthStore = create<IAuthState>()(
  immer(
    devtools(
      persist(authStore, {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          refreshToken: state.refreshToken,
          refreshTokenExpiresAt: state.refreshTokenExpiresAt,
          isAuthenticated: state.isAuthenticated,
        }),
      })
    )
  )
);

export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
export const useAuthIsLoading = () => useAuthStore((s) => s.isLoading);

export const getAuthState = () => useAuthStore.getState();
export const setTokens = (access: string, refresh: string) =>
  useAuthStore.getState().setTokens(access, refresh);
export const setAuthLoading = (value: boolean) => useAuthStore.getState().setLoading(value);
export const logout = () => useAuthStore.getState().logout();

export { useAuthStore };
