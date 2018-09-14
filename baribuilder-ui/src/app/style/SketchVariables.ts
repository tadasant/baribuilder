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
      'textAlign': 'center',
      'fontSize': '32px',
      'fontWeight': 800,
      'tablet': {
        'fontSize': '48px',
        'fontWeight': 800,
      },
    },
    'header2': { // bold
      'textAlign': 'center',
      'fontSize': '24px',
      'fontWeight': 600,
      'tablet': {
        'fontSize': '36px',
        'fontWeight': 600,
      }
    },
    'body': {
      'fontSize': '18px',
      'tablet': {
        'fontSize': '21px',
      },
    },
    'caption': { // light italic
      'fontSize': '14px',
      'fontWeight': 300,
      'fontStyle': 'italic',
      'textAlign': 'center',
      'verticalAlign': 'middle',
    },
    'subcaption': { // light italic
      'fontSize': '11px',
      'fontWeight': 300,
      'fontStyle': 'italic',
      'textAlign': 'center',
      'verticalAlign': 'middle',
    },
  },
  'breakpoints': {
    'desktop': 1280,
    'tablet': 600,
    'mobile': 320,
  },
};

export default Sketch;
