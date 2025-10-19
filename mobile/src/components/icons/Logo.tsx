import React from 'react';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';

const Logo: React.FC<{ size?: number }> = ({ size = 88 }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <Rect x="0" y="0" width="64" height="64" rx="12" fill="#FFFFFF" />
    <G>
      <Path d="M16 36c0-11 8-20 18-20s18 9 18 20" stroke="#111827" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="32" cy="24" r="4" fill="#111827" />
      <Path d="M20 44c3-3 7-5 12-5s9 2 12 5" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

export default Logo;
