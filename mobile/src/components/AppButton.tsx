import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  style?: ViewStyle;
};

const AppButton: React.FC<Props> = ({ title, onPress, loading = false, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={loading} activeOpacity={0.8}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AppButton;
