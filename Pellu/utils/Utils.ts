const USERNAME_REGEX = /^[a-zA-Z0-9._]+$/;
const NAME_REGEX = /^[a-zA-Z0-9._ áâãéêíóôõúçÁÂÃÉÊÍÓÔÕÚÇ]+$/;

export function extractYouTubeID(url: string) {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/))([^?&]+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
}

export function removeInvalidUsernameChars(str: string) {
  let invalids = [];

  for (let char of str) {
    if (!USERNAME_REGEX.test(char)) {
      invalids.push(char);
    }
  }

  for (let invalid of invalids) {
    str = str.replace(invalid, '');
  }

  return str;
}

function getInvalidCharsFromRegex(str: string, regex: RegExp) {
  let invalids = '';

  for (let char of str) {
    if (!regex.test(char)) {
      char = char === ' ' ? 'espaço' : char;
      invalids += char + ' ';
    }
  }

  return invalids;
}

export function getInvalidUsernameChars(str: string) {
  return getInvalidCharsFromRegex(str, USERNAME_REGEX);
}

export function getInvalidNameChars(str: string) {
  return getInvalidCharsFromRegex(str, NAME_REGEX);
}