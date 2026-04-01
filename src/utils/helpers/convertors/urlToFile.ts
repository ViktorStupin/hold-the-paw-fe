export const urlToFile = async (url: string): Promise<File> => {
  const proxiedUrl = url.replace('http://127.0.0.1:8001', '');

  const response = await fetch(proxiedUrl);
  const blob = await response.blob();
  const filename = url.split('/').pop() ?? 'photo';

  return new File([blob], filename, { type: blob.type });
};