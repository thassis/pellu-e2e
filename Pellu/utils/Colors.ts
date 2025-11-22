const Colors = {
  primary: '#ff7500',
  secondary: '#2d2d2d',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#3F3E3E',
  lightGray: '#A4A19F',
  backgroundGray: '#F3F4F7',
  background: '#F2F2F7',
  text: 'black',
  lightYellow: '#fffee0',
  error: '#FF5500',
  disabled: '#d3d3d3',
  link: '#3366CC',
};

export function hexToRGBA(hex: string, opacity?: number) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default Colors;
