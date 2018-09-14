declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

// Missing typings
declare module 'react-facebook-pixel' {
  const ReactPixel: any;
  export default ReactPixel;
}