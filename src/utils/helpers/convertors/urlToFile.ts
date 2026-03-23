export const urlToFile = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = url.split('/').pop() ?? 'photo';
  return new File([blob], filename, { type: blob.type });
};
