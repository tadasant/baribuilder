import * as ReactGA from 'react-ga';

export const generateTrackNavClick = (label: string): (() => void) => {
  return () => ReactGA.event({
    category: 'Internal Link',
    action: 'click',
    label,
  });
};
