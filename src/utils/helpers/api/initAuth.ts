import { getAuthState, logout, setTokens } from '@/store/auth.store';
import { authServices } from '@/utils/api/services/auth.services';

export const initAuth = async () => {
  const { refreshToken, refreshTokenExpiresAt } = getAuthState();
  if (!refreshToken || !refreshTokenExpiresAt) return;

  if (Date.now() > refreshTokenExpiresAt) {
    logout();
    return;
  }

  try {
    const { access, refresh } = await authServices.refreshToken(refreshToken);
    setTokens(access, refresh);
  } catch {
    logout();
  }
};
