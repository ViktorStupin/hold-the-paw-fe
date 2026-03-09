export type Status = 'danger' | 'warning' | 'success';

export const statusConfig: Record<Status, { color: string }> = {
  danger: {
    color: 'text-error',
  },
  warning: {
    color: 'text-warning',
  },
  success: {
    color: 'text-success',
  },
};