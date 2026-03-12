export const normalizeUaPhone = (input: string) => {
  const digits = input.replace(/\D/g, '');

  let localDigits = digits;

  if (localDigits.startsWith('380')) {
    localDigits = localDigits.slice(3);
    console.log(localDigits);
  }

  if (localDigits.length === 0) {
    return '';
  }

  return `+380${localDigits.slice(0, 9)}`;
};

export const normalizeEDRPOU = (input: string) => {
  const digits = input.replace(/\D/g, '');

  return digits.slice(0, 8);
};
