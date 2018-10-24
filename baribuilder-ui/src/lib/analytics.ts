export const defaultFields = {
  appVersionNumber: require('../../package.json').version
};

export const generateTrackNavClick = (label: string): (() => void) => {
  return () => analytics.track('Clicked Internal Link', {
    ...defaultFields,
    label
  });
};

export const generateTrackExternalLinkClick = (label: string): (() => void) => {
  return () => analytics.track('Clicked Outbound Link', {
    ...defaultFields,
    label
  });
};

export const generateTrackAffiliateLinkClick = (listingId: string, retailerName: string, affiliateSource: string, productId: string): (() => void) => {
  return () => analytics.track('Clicked Affiliate Link', {
    ...defaultFields,
    productId,
    listingId,
    retailerName,
    affiliateSource
  });
};

export const trackScrollPercent = (screenName: string, percentScrolled: number) => {
  analytics.track('Scrolled Screen', {
    ...defaultFields,
    screenName,
    percentScrolled
  })
};

// Initialized in index.html's <head>
declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS;
  }
}

export default window.analytics;
