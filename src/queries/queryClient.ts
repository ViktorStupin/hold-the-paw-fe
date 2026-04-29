import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      suppressGlobalError?: boolean;
    };
    mutationMeta: {
      suppressGlobalError?: boolean;
    };
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onError: (err, _vars, _ctx, mutation) => {
      if (mutation.options.meta?.suppressGlobalError) return;
      toast.error(getServerErrorMessage(err));
    },
  }),
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (query.options.meta?.suppressGlobalError) return;
      if (query.state.data !== undefined) {
        toast.error(getServerErrorMessage(err));
      }
    },
  }),
});
