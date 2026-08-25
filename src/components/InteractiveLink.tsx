import { useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

interface InteractiveLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  previewSrc?: string;
  previewAlt?: string;
  previewHref?: string;
  trackingEvent?: string;
  trackingData?: Record<string, string>;
}

type UmamiWindow = Window & {
  umami?: {
    track: (eventName: string, data?: Record<string, string>) => void;
  };
};

function trackEvent(eventName: string | undefined, data: Record<string, string>) {
  if (!eventName) return;
  (window as UmamiWindow).umami?.track(eventName, data);
}

export function InteractiveLink({
  children,
  previewSrc,
  previewAlt,
  previewHref,
  trackingEvent,
  trackingData = {},
  className = '',
  ...props
}: InteractiveLinkProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const resolvedPreviewHref = previewHref ?? props.href;

  const handlePrimaryClick = (event: MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(event);
    if (event.defaultPrevented) return;

    const opensPreview = previewSrc && !isPreviewOpen && window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!opensPreview) {
      trackEvent(trackingEvent, { ...trackingData, trigger: 'text-link' });
      return;
    }

    event.preventDefault();
    setIsPreviewOpen(true);
  };

  return (
    <span className={`interactive-link-wrap${previewSrc ? ' has-preview' : ''}${isPreviewOpen ? ' is-preview-open' : ''}`}>
      <a {...props} className={`interactive-text ${className}`.trim()} onClick={handlePrimaryClick}>
        {children}
      </a>
      {previewSrc && resolvedPreviewHref && (
        <a
          href={resolvedPreviewHref}
          target={props.target}
          rel={props.rel}
          className="interactive-link-preview"
          aria-label={previewAlt ?? 'Open preview'}
          onClick={(event) => {
            event.stopPropagation();
            trackEvent(trackingEvent, { ...trackingData, trigger: 'preview' });
            setIsPreviewOpen(false);
          }}
        >
          <img src={previewSrc} alt={previewAlt ?? ''} loading="lazy" />
        </a>
      )}
    </span>
  );
}
