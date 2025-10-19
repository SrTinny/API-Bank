import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  variant?: 'primary' | 'outline';
};

const AppButton: React.FC<Props> = ({ title, onPress, loading = false, style, disabled = false, variant = 'outline' }) => {
  const isDisabled = disabled || loading === true;
  const variantStyle = variant === 'primary' ? styles.buttonPrimary : styles.buttonOutline;
  const textStyle = variant === 'primary' ? styles.textPrimary : styles.textOutline;

  return (
    <TouchableOpacity
      style={[styles.button, variantStyle, style, isDisabled ? styles.buttonDisabled : null]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? <ActivityIndicator color={variant === 'primary' ? '#fff' : '#111827'} /> : <Text style={textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#111827',
  },
  buttonOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textPrimary: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  textOutline: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default AppButton;
