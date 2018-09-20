export const fixedWidthImage = (imagekitURL: string, width: string): string => {
  const tokens = imagekitURL.split('/');
  if (tokens[2] !== 'ik.imagekit.io') {
    console.warn(`Attempted to perform fixedWidthImage on non-imagekit image: ${imagekitURL}`)
    return imagekitURL;
  }
  tokens.splice(tokens.length - 1, 0, `tr:w-${width}`);
  return tokens.join('/');
};
