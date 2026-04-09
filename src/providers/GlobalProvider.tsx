import { queryClient } from '@/queries/queryClient';
import { Root } from '@/routes/Root';
import { QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthInitializer } from './AuthInitializer';

export const GlobalProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        <Root />
      </AuthInitializer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
