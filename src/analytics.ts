type AnalyticsEventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: AnalyticsEventData) => void;
    };
  }
}

export function trackEvent(eventName: string, data?: AnalyticsEventData) {
  window.umami?.track(eventName, data);
}
