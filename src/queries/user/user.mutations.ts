import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileServices } from '@/utils/api/services/profile.services';
import { userKeys } from './user.keys';
import type { TUserRequest } from '@/schemas/user/user.request.shema';

export const useMutateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<TUserRequest>) => profileServices.updateMe(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.me(), updatedUser);
    },
  });
};
