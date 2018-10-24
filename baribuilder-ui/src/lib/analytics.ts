export const defaultFields = {
  versionNumber: require('../../package.json').version
};

export const generateTrackNavClick = (label: string): (() => void) => {
  // TODO segment
  return () => console.log(defaultFields);
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

// Initialized in index.html's <head>
declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS;
  }
}

export default window.analytics;
