const Sketch = {
  'color': {
    'primary': {
      'green': '#82CD23',
      'green-2': '#6FB01A', // darker
    },
    'secondary': {
      'blue': '#008BCC',
      'blue-2': '#3BAFE0', // lighter
      'blue-3': '#49CBFF', // lightest
    },
    'accent': {
      'black': '#2D3239',
      'white': '#F2F2F2',
    },
    'background': { // light blue (use 10, 25, 50, 75 opacity)
      'transparent': '#49CBFF',
      'opaque': '#9DE3FF', // similar to transparent/50
    }
  },
  'typography': {
    'fontFamily': 'Open Sans',
    'header': { // extra bold
      'text-align': 'center',
      'font-size': '32px',
      'font-weight': 800,
      'tablet': {
        'font-size': '48px',
        'font-weight': 800,
      },
    },
    'header-2': { // bold
      'text-align': 'center',
      'font-size': '24px',
      'font-weight': 600,
      'tablet': {
        'font-size': '36px',
        'font-weight': 600,
      }
    },
    'body': {
      'font-size': '18px',
      'tablet': {
        'font-size': '21px',
      },
    },
    'caption': { // light italic
      'font-size': '14px',
      'font-weight': 300,
      'font-style': 'italic',
      'text-align': 'center',
      'vertical-align': 'middle',
    },
    'subcaption': { // light italic
      'font-size': '11px',
      'font-weight': 300,
      'font-style': 'italic',
      'text-align': 'center',
      'vertical-align': 'middle',
    },
  },
  'breakpoints': {
    'desktop': 1280,
    'tablet': 600,
    'mobile': 320,
  },
  'gutters': {
    'desktop': 32,
    'tablet': 16,
    'mobile': 16,
  },
};

export default Sketch;
