import { isAxiosError } from 'axios';

export function getServerErrorMessage(error: unknown, fallback = 'Щось пішло не так'): string {
  if (isAxiosError(error) && error.response?.data) {
    const data = error.response.data;

    if (data.detail) return data.detail;

    const messages = Object.values(data).flat().filter(Boolean);
    if (messages.length) return messages.join(' ');
  }

  return fallback;
}
