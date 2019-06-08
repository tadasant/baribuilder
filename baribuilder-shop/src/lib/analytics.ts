const appVersionTokens = require('../../package.json').version.split('.');

export const defaultFields = {
  appMajorVersion: appVersionTokens[0],
  appMinorVersion: appVersionTokens[1],
  appPatchVersion: appVersionTokens[2]
};

export const generateTrackNavClick = (label: string): (() => void) => {
  return () => analytics.track('Clicked Internal Link', {
    ...defaultFields,
    label
  });
};

export const trackButtonClick = (label: string, id?: string): (() => void) => {
  return () => analytics.track('Clicked Button', {
    ...defaultFields,
    label,
    id
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

export const trackDemoVideoPlayer = (percent: number) => {
  analytics.track('Playing demo video', {
    ...defaultFields,
    percent
  })
};

export const trackPopupAction = (action: string) => {
  analytics.track('Popup', {
    ...defaultFields,
    action,
  })
};

// Initialized in index.html's <head>
declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS;
  }
}

export default window.analytics;
