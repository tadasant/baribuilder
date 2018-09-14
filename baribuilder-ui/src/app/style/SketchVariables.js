const Sketch = {
  'color': {
    'primary': {
      'green': '#82CD23',
      'green2': '#6FB01A', // darker
    },
    'secondary': {
      'blue': '#008BCC',
      'blue2': '#3BAFE0', // lighter
      'blue3': '#49CBFF', // lightest
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
    'header2': { // bold
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
      'fontsize': '14px',
      'fontweight': 300,
      'fontstyle': 'italic',
      'textalign': 'center',
      'verticalalign': 'middle',
    },
    'subcaption': { // light italic
      'fontsize': '11px',
      'fontweight': 300,
      'fontstyle': 'italic',
      'textalign': 'center',
      'verticalalign': 'middle',
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
