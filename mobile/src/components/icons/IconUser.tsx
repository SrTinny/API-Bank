import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const IconUser: React.FC<{ size?: number; color?: string }> = ({ size = 40, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="3" stroke={color} strokeWidth={1.6} />
    <Path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default IconUser;
