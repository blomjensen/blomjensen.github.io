import { useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

interface InteractiveLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  previewSrc?: string;
  previewAlt?: string;
  previewHref?: string;
  previewContent?: ReactNode;
  previewClassName?: string;
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
  previewContent,
  previewClassName,
  trackingEvent,
  trackingData = {},
  className = '',
  ...props
}: InteractiveLinkProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const resolvedPreviewHref = previewHref ?? props.href;
  const hasPreview = Boolean(previewSrc || previewContent);

  const handlePrimaryClick = (event: MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(event);
    if (event.defaultPrevented) return;

    const opensPreview = hasPreview && !isPreviewOpen && window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!opensPreview) {
      trackEvent(trackingEvent, { ...trackingData, trigger: 'text-link' });
      return;
    }

    event.preventDefault();
    setIsPreviewOpen(true);
  };

  return (
    <span className={`interactive-link-wrap${hasPreview ? ' has-preview' : ''}${isPreviewOpen ? ' is-preview-open' : ''}`}>
      <a {...props} className={`interactive-text ${className}`.trim()} onClick={handlePrimaryClick}>
        {children}
      </a>
      {hasPreview && resolvedPreviewHref && (
        <a
          href={resolvedPreviewHref}
          target={props.target}
          rel={props.rel}
          className={`interactive-link-preview${previewClassName ? ` ${previewClassName}` : ''}`}
          aria-label={previewAlt ?? 'Open preview'}
          onClick={(event) => {
            event.stopPropagation();
            trackEvent(trackingEvent, { ...trackingData, trigger: 'preview' });
            setIsPreviewOpen(false);
          }}
        >
          {previewContent ?? <img src={previewSrc} alt={previewAlt ?? ''} loading="lazy" />}
        </a>
      )}
    </span>
  );
}
