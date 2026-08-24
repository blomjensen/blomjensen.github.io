import { useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

interface InteractiveLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  previewSrc?: string;
  previewAlt?: string;
  previewHref?: string;
}

export function InteractiveLink({ children, previewSrc, previewAlt, previewHref, className = '', ...props }: InteractiveLinkProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const resolvedPreviewHref = previewHref ?? props.href;

  const handlePrimaryClick = (event: MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(event);
    if (event.defaultPrevented || !previewSrc || isPreviewOpen) return;
    if (!window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

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
            setIsPreviewOpen(false);
          }}
        >
          <img src={previewSrc} alt={previewAlt ?? ''} loading="lazy" />
        </a>
      )}
    </span>
  );
}
