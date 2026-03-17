import { Button } from '@/components/ui/button';
import { logout, useIsAuthenticated } from '@/store/auth.store';

export const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      {useIsAuthenticated() && <Button onClick={logout}>Logout</Button>}
    </div>
  );
};
