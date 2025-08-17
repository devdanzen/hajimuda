'use client';

import * as React from 'react';

import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function HajiMudaIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} sx={{ height: 42, width: 220, mr: 2, ...props.sx }} viewBox="0 0 110 20">
      <title>HajiMuda</title>

      {/* Left mark: crescent + star */}
      <g transform="translate(4,2)">
        <circle cx="10" cy="8.5" r="7.2" fill="#AD974F" />
        <circle cx="13.5" cy="7.0" r="5.6" fill="#fff" />
        <polygon
          points="20.5,2.5 21.6,4.8 24.1,4.8 22.0,6.2 23.1,8.5 20.5,7.0 17.9,8.5 19.0,6.2 16.0,4.8 18.4,4.8"
          fill="#AD974F"
          transform="scale(0.9) translate(0,0.25)"
        />
      </g>

      {/* Minaret silhouette inside crescent */}
      <path
        d="M11 3.8v6.6M10 4.8h2M10.5 2.8h1"
        stroke="#AD974F"
        strokeWidth={0.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(4,2)"
      />

      {/* Wordmark: HajiMuda */}
      <text
        x="36"
        y="13.6"
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="10.8"
        fill="#AD974F"
      >
        HajiMuda
      </text>
    </SvgIcon>
  );
}
