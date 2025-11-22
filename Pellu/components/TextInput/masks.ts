export const maskPhone = (value: string) => {
  let cleaned = ('' + value).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  match = cleaned.match(/^(\d{2})(\d{4})(\d{0,4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  if (cleaned.length > 2) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
  }
  return cleaned;
};

export const unmaskPhone = (maskedValue: string) => {
  return maskedValue.replace(/\D/g, '');
};
