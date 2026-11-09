import React from 'react';

/* Line drawings of the surveyed rooms (400 × 240), standing in for site photographs. */
const S = {stroke: '#1d3a8a', strokeWidth: 1.6, fill: 'none'};

function Office() {
  return (
    <g {...S}>
      <path d="M0 40 H400 M0 186 H400" />
      {[...Array(9)].map((_, i) => <path key={i} d={`M${120 + i * 21} 14 v26`} opacity=".5" />)}
      <rect x="120" y="14" width="170" height="26" />
      <rect x="30" y="76" width="40" height="110" /><circle cx="62" cy="134" r="2.5" fill="#1d3a8a" />
      <rect x="330" y="76" width="40" height="110" /><circle cx="338" cy="134" r="2.5" fill="#1d3a8a" />
      {[...Array(11)].map((_, i) => <path key={i} d={`M${96 + i * 21} 186 l-8 44`} opacity=".7" />)}
      <path d="M90 230 H310" /><path d="M96 208 H306" opacity=".6" />
      <rect x="140" y="120" width="120" height="8" /><path d="M150 128 v40 M250 128 v40" />
      <rect x="168" y="96" width="34" height="22" /><path d="M185 118 v2" />
    </g>
  );
}
function Kitchen() {
  return (
    <g {...S}>
      <path d="M0 200 H400" />
      <rect x="40" y="120" width="150" height="80" />{[0, 1, 2].map((i) => <g key={i}><rect x={44 + i * 50} y="126" width="44" height="70" /><path d={`M${80 + i * 50} 156 v10`} /></g>)}
      <rect x="36" y="112" width="158" height="8" /><path d="M110 112 c0 -16 16 -16 16 -6" /><rect x="96" y="100" width="40" height="8" opacity=".6" />
      <rect x="40" y="30" width="150" height="56" />{[0, 1, 2].map((i) => <rect key={i} x={44 + i * 50} y="34" width="44" height="48" />)}
      <rect x="240" y="40" width="70" height="160" /><path d="M240 110 H310 M300 70 v14 M300 130 v14" />
      <circle cx="96" cy="190" r="6" opacity=".45" /><circle cx="118" cy="186" r="9" opacity=".3" />
    </g>
  );
}
function Washroom() {
  return (
    <g {...S}>
      <path d="M0 200 H400" />
      {[0, 1, 2, 3].map((i) => <g key={i}><rect x={30 + i * 45} y="70" width="45" height="122" /><path d={`M${36 + i * 45} 192 v6 M${69 + i * 45} 192 v6`} /><rect x={62 + i * 45} y="126" width="6" height="12" /></g>)}
      <rect x="250" y="60" width="60" height="132" /><rect x="258" y="70" width="44" height="22" /><path d="M262 76 h36 M262 82 h24" opacity=".6" /><path d="M300 130 h6" />
      <path d="M330 200 l20 -30 h40 M350 170 l20 -30 h20" />
    </g>
  );
}
function Reception() {
  return (
    <g {...S}>
      <path d="M0 200 H400" />
      <rect x="150" y="50" width="200" height="140" />{[1, 2, 3].map((i) => <path key={i} d={`M${150 + i * 50} 50 v140`} />)}<path d="M150 120 H350" opacity=".35" />
      <path d="M160 60 l20 30 M220 70 l14 22" opacity=".4" />
      <rect x="30" y="120" width="100" height="80" /><rect x="26" y="114" width="108" height="8" />
      <path d="M50 150 h60" opacity=".5" />
    </g>
  );
}

export default function Scene({scene, children, label}) {
  const Body = {office: Office, kitchen: Kitchen, washroom: Washroom, reception: Reception}[scene];
  return (
    <svg viewBox="0 0 400 240" className="scene" role="img" aria-label={label}>
      <rect width="400" height="240" fill="#f7f6f1" />
      <Body />
      {children}
    </svg>
  );
}
