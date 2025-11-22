export const getStringMonth = (month: number) => {
  switch (month) {
    case 0:
      return 'Janeiro';
    case 1:
      return 'Fevereiro';
    case 2:
      return 'Março';
    case 3:
      return 'Abril';
    case 4:
      return 'Maio';
    case 5:
      return 'Junho';
    case 6:
      return 'Julho';
    case 7:
      return 'Agosto';
    case 8:
      return 'Setembro';
    case 9:
      return 'Outubro';
    case 10:
      return 'Novembro';
    case 11:
    default:
      return 'Dezembro';
  }
};

export const getStringDate = (date: Date) => {
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();
  let stringDate = `${date.getDate()} de ${getStringMonth(date.getMonth())}`;
  if (year !== currentYear) {
    stringDate += `, ${year}`;
  }

  return stringDate;
};

export const getDateFromId = (id: string) => {
  return new Date(parseInt(id.substring(0, 8), 16) * 1000);
};

export const getStringDateFromId = (id: string) => {
  if (id.includes('local_id')) return 'agora';
  const date = getDateFromId(id);
  return getStringDate(date);
};

export const getPetAgeFromTimestamp = (birthdate: string | number) => {
  const numberTimestamp =
    typeof birthdate === 'string' ? parseInt(birthdate) : birthdate;
  const today = new Date();
  const date = new Date(numberTimestamp);
  const age = today.getFullYear() - date.getFullYear();
  const month = today.getMonth() - date.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < date.getDate())) {
    return age - 1;
  }
  return age;
};

export const getFormattedDateFromTimestamp = (age: number) => {
  const date = new Date(age);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getPetTimestampFromAge = (age: string) => {
  if (!age) return;
  const today = new Date();
  const birthdate = new Date(today);
  birthdate.setFullYear(today.getFullYear() - parseInt(age));
  return birthdate.getTime();
};

export const getTimestampFromFormattedDate = (dateString: string) => {
  if (!dateString) return;

  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  return date.getTime();
};

export const checkDateIsValid = (date: string) => {
  const [day, month, year] = date.split('/').map(Number);
  const dateObject = new Date(year, month - 1, day);
  return (
    dateObject.getDate() === day &&
    dateObject.getMonth() === month - 1 &&
    dateObject.getFullYear() === year &&
    year > 1900
  );
};

export const getPublishedAtFromId = (id: string) => {
  const date = getDateFromId(id);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

  if (diffMins < 1) {
    return 'Agora';
  } else if (diffMins < 2) {
    return 'Há 1 minuto atrás';
  } else if (diffMins < 60) {
    return `Há ${diffMins} minutos atrás`;
  } else if (diffHours < 24) {
    return `Há ${diffHours} horas atrás`;
  } else if (diffDays < 30) {
    return `Há ${diffDays} dias atrás`;
  } else if (diffMonths < 12) {
    return `Há ${diffMonths} meses atrás`;
  } else {
    return `Há ${diffYears} anos atrás`;
  }
}