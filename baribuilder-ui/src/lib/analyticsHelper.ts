export const generateTrackNavClick = (label: string): (() => void) => {
  // TODO segment
  return () => console.log('event');
  // return () => ReactGA.event({
  //   category: 'Internal Link',
  //   action: 'click',
  //   label,
  // });
};

export const generateTrackExternalLinkClick = (label: string): (() => void) => {
  // TODO segment
  return () => console.log('event');
  // return () => ReactGA.event({
  //   category: 'Outbound Link',
  //   action: 'click',
  //   label,
  // });
};
