import React, { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TextInput as RNTextInput } from 'react-native';

// 1. O tipo AppInputProps continua o mesmo, mas vamos garantir o tipo do Ref
type AppInputProps = TextInputProps & {
  label?: string;
  placeholder?: string;
};

// 2. Usamos 'forwardRef' e tipamos o Ref como o componente nativo RNTextInput
export const AppInput = forwardRef<RNTextInput, AppInputProps>(({ label, style, placeholder, ...rest }, ref) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        ref={ref} // 3. Repassa a referência para o TextInput interno
        placeholder={placeholder}
        style={[styles.input, style]}
        placeholderTextColor="#9CA3AF"
        {...rest}
      />
    </View>
  );
});

// Garante um nome de exibição no DevTools
AppInput.displayName = 'AppInput';

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E6E9EE',
    color: '#111827',
  },
});

export default AppInput;