// TODO convert all images to here

export const fixedWidthImage = (imagekitURL, width) => {
  const tokens = imagekitURL.split('/');
  if (tokens[2] !== 'ik.imagekit.io') {
    console.warn(`Attempted to perform fixedWidthImage on non-imagekit image: ${imagekitURL}`)
    return imagekitURL;
  }
  tokens.splice(tokens.length - 1, 0, `tr:w-${width}`);
  return tokens.join('/');
};

export const imagekitURLs = {
  'coloredLogo': 'https://ik.imagekit.io/vitaglab/vita.g-colored-logo-horizontal_r1mcrkLI7.png',
  'personInCrowd': 'https://ik.imagekit.io/vitaglab/person-in-crowd_HJLcTa_LX.png',
  'step1': 'https://ik.imagekit.io/vitaglab/step1-v2_Hk-ddLzT7.png',
  'step2': 'https://ik.imagekit.io/vitaglab/step2-v2_r1SbDDfpQ.png',
  'step3': 'https://ik.imagekit.io/vitaglab/step3-v2_r1xAyYUGpX.png',
  'step4': 'https://ik.imagekit.io/vitaglab/step4-v2_BkA1tUG6Q.png',
  'globe': 'https://ik.imagekit.io/vitaglab/globe_BkkGZMzp7.png',
  'scale': 'https://ik.imagekit.io/vitaglab/scale_ryWJfWff67.png',
  'users': 'https://ik.imagekit.io/vitaglab/users_HkxyfZMz6X.png',
};

export default {
  // No auto-conversion here due to complexity
  'hero': {
    'mobile': 'https://ik.imagekit.io/vitaglab/hero-mobile_H1O0qndIm.png',
    'tablet': 'https://ik.imagekit.io/vitaglab/hero-tablet_BywC9n_I7.png',
    'desktop': 'https://ik.imagekit.io/vitaglab/hero-desktop_rkiAc3dUX.png',
  },
  'coloredLogo': {
    'original': imagekitURLs.coloredLogo,
    'mobile': fixedWidthImage(imagekitURLs.coloredLogo, 64),
    'tablet': fixedWidthImage(imagekitURLs.coloredLogo, 128),
  },
};
