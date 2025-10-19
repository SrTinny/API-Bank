import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import AppButton from '../components/AppButton';
import { Picker } from '@react-native-picker/picker';
import AppInput from '../components/AppInput';
import IconUser from '../components/icons/IconUser';
import { TipoConta } from '../types/bank';
import { ContaApiService } from '../api/ContaApiService';

const CadastrarContaScreen: React.FC<{ navigation?: any; onBack?: () => void }> = ({ navigation, onBack }) => {
  const [titular, setTitular] = useState('');
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState<TipoConta>('COMUM');
  const [limiteChequeEspecial, setLimiteChequeEspecial] = useState<string>('0');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!titular.trim() || !numero.trim()) {
      Alert.alert('Preencha os campos', 'Titular e número são obrigatórios');
      return;
    }

    const payload: any = {
      titular: titular.trim(),
      numero: numero.trim(),
      // backend espera o campo 'tipo' conforme ContaCadastroDTO
      tipo: tipo,
    };

    if (tipo === 'ESPECIAL') {
      const parsed = Number(limiteChequeEspecial);
      if (Number.isNaN(parsed)) {
        Alert.alert('Valor inválido', 'Limite do cheque especial deve ser um número');
        return;
      }
      payload.limiteChequeEspecial = parsed;
    }

    try {
      setLoading(true);
      const created = await ContaApiService.cadastrarConta(payload);
      Alert.alert('Conta criada', `Conta ${created.numero} criada com sucesso`);
      // Navega automaticamente para tela de Movimentação passando o número criado
      if (navigation && created && created.numero) {
        navigation.navigate('Movimentacao', { initialNumero: created.numero });
      }
      // limpar formulário
      setTitular('');
      setNumero('');
      setTipo('COMUM');
      setLimiteChequeEspecial('0');
    } catch (err: any) {
      console.error(err);
      // tenta extrair mensagem do backend (Axios) se disponível
      const backendMessage = err?.response?.data?.message || err?.message;
      Alert.alert('Erro', backendMessage || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {onBack && (
        <View style={{ marginBottom: 8 }}>
          <AppButton title="Voltar" onPress={onBack} variant="outline" />
        </View>
      )}
      <View style={{ alignItems: 'center', marginBottom: 8 }}>
        <IconUser size={48} />
      </View>
      <Text style={styles.title}>Cadastrar Conta</Text>
      <AppInput label="Titular" placeholder="Nome do titular" value={titular} onChangeText={setTitular} />
      <AppInput label="Número" placeholder="0000-0" value={numero} onChangeText={setNumero} />

      <Text style={styles.label}>Tipo de conta</Text>
      <View style={Platform.OS === 'android' ? styles.pickerAndroidWrapper : undefined}>
        <Picker selectedValue={tipo} onValueChange={(v) => setTipo(v as TipoConta)}>
          <Picker.Item label="Comum" value="COMUM" />
          <Picker.Item label="Poupança" value="POUPANCA" />
          <Picker.Item label="Especial" value="ESPECIAL" />
        </Picker>
      </View>

      {tipo === 'ESPECIAL' && (
        <AppInput label="Limite Cheque Especial" placeholder="0.00" value={limiteChequeEspecial} onChangeText={setLimiteChequeEspecial} keyboardType="numeric" />
      )}

      <View style={styles.button}>
        <AppButton title={loading ? 'Enviando...' : 'Cadastrar'} onPress={onSubmit} loading={loading} variant="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FAFAFB',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0F172A',
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    color: '#374151',
    fontWeight: '600',
  },
  pickerAndroidWrapper: {
    borderWidth: 1,
    borderColor: '#E6E9EE',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 18,
  },
});

export default CadastrarContaScreen;
