import React from 'react';
import site from '../content.js';

/* Wordmark: the site's symbol (from content.js) plus its name. */
export default function Logo({light = false}) {
  return (
    <span className={`logo${light ? ' light' : ''}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" dangerouslySetInnerHTML={{__html: site.logoSvg}} />
      <span>{site.name}</span>
    </span>
  );
}
