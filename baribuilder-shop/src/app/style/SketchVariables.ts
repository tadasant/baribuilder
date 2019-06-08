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
      'blackrgba': (alpha: number) => `rgba(45, 50, 57, ${alpha})`,
      'white': '#F2F2F2',
      'grey': '#D9D9D9',
      'darkgrey': '#A6A6A6',
      'danger': '#E90000',
    },
    'background': { // light blue (use 10, 25, 50, 75 opacity)
      'transparent': '#49CBFF',
      'opaque': '#9DE3FF', // similar to transparent/50
      'white': '#FFFFFF',
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
    'bodybold': { // emphasized body
      'textAlign': 'center',
      'fontSize': '18px',
      'fontWeight': 600,
      'tablet': {
        'fontSize': '21px',
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
    'desktop': 1119,
    'tablet': 599,
    'mobile': 319,
  },
};

export default Sketch;
