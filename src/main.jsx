import React from 'react';
import {hydrateRoot, createRoot} from 'react-dom/client';
import App from './App.jsx';
import './style.css';
import './theme.css';
import {startMotion} from './motion.js';

const root = document.getElementById('root');
const path = window.location.pathname.replace(/\/$/, '') || '/';
const app = <App path={path} />;
// Known routes are prerendered and hydrate; anything else (a host's SPA fallback) renders fresh as the 404 page.
const known = ['/', '/app', '/privacy', '/terms'].includes(path);
if (known && root.hasChildNodes()) hydrateRoot(root, app);
else { root.textContent = ''; createRoot(root).render(app); }
if (!path.startsWith('/app')) requestAnimationFrame(() => startMotion({hero: '.hero', heroVisual: '.hero-visual'}));
