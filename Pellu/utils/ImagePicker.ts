import ImagePicker, {
  Image,
  CommonOptions as ImagePickerOptions,
} from 'react-native-image-crop-picker';

export type PickerImage = Image;

type ImageSize = 'square' | 'large';

const imageSizes = {
  square: {
    width: 400,
    height: 400,
  },
  large: {
    width: 800,
    height: 560,
  },
};

export const openPicker = async (type: ImageSize, callback: (image: PickerImage) => void, options?: ImagePickerOptions) => {
  await ImagePicker.openPicker({
    width: imageSizes[type].width,
    height: imageSizes[type].height,
    cropping: true,
    compressImageQuality: 0.9,
    forceJpg: true,
    mediaType: 'photo',
    ...options,
  }).then((image: PickerImage) => {
    callback(image);
  }).catch(error => {
    console.log('ImagePicker Error: ', error);
  });
}