// components/ProtectedNavLink.tsx
import { NavLink, type NavLinkProps } from 'react-router-dom';
import { useRequireAuth } from './useRequireAuth';

type Props = NavLinkProps & {
  requireAuth?: boolean;
  authMessage?: string;
};

export const ProtectedNavLink = ({
  requireAuth,
  authMessage = 'Авторизуйтесь, щоб продовжити',
  to,
  onClick,
  ...rest
}: Props) => {
  const { requireAuth: checkAuth } = useRequireAuth();

  const handleClick: NavLinkProps['onClick'] = (e) => {
    if (!requireAuth) {
      onClick?.(e);
      return;
    }

    e.preventDefault(); 
    checkAuth(to as string, authMessage);

    onClick?.(e);
  };

  return <NavLink to={to} onClick={handleClick} {...rest} />;
};