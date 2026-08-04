import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface InteractiveLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  previewSrc?: string;
  previewAlt?: string;
}

export function InteractiveLink({ children, previewSrc, previewAlt, className = '', ...props }: InteractiveLinkProps) {
  return (
    <span className={`interactive-link-wrap${previewSrc ? ' has-preview' : ''}`}>
      <a {...props} className={`interactive-text ${className}`.trim()}>
        {children}
      </a>
      {previewSrc && (
        <span className="interactive-link-preview" aria-hidden="true">
          <img src={previewSrc} alt={previewAlt ?? ''} loading="lazy" />
        </span>
      )}
    </span>
  );
}
