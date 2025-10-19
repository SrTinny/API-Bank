import React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconTransfer: React.FC<{ size?: number; color?: string }> = ({ size = 40, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15v4a1 1 0 0 1-1 1h-4" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 9v-4a1 1 0 0 1 1-1h4" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M7 12h10" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default IconTransfer;
