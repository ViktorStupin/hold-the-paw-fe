import { useAuthStore } from '@/store/auth.store';

export const usePetOwner = (authorId: number | undefined): boolean | null => {
  const userId = useAuthStore((s) => s.userId);

  if (!authorId || !userId) return null;
  return authorId === userId;
};