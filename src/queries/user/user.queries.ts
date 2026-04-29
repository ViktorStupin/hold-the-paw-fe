import { QueryClient, useQuery } from '@tanstack/react-query';
import { profileServices } from '@/utils/api/services/profile.services';
import { userKeys } from './user.keys';
import type { TUser } from '@/schemas/user/user.form.schema';


export const useMe = () =>
  useQuery<TUser>({
    queryKey: userKeys.me(),
    queryFn: () => profileServices.getMe(),
    staleTime: Infinity,
    meta: { suppressGlobalError: true },
  });

export const prefetchMe = (queryClient: QueryClient) =>
  queryClient.prefetchQuery({
    queryKey: userKeys.me(),
    queryFn: () => profileServices.getMe(),
    staleTime: Infinity,
    retry: false,
  });
