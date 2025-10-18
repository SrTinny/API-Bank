import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AppInput from '../components/AppInput';
import { ContaApiService } from '../services/ContaApiService';

const MovimentacaoScreen: React.FC = () => {
  const [numero, setNumero] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOperacao = async (tipo: 'saque' | 'deposito') => {
    if (!numero.trim() || !valor.trim()) {
      Alert.alert('Campos obrigatórios', 'Número da conta e valor são obrigatórios');
      return;
    }

    const parsed = Number(valor);
    if (Number.isNaN(parsed)) {
      Alert.alert('Valor inválido', 'Informe um número válido para o valor');
      return;
    }

    try {
      setLoading(true);
      if (tipo === 'saque') {
        await ContaApiService.sacar(numero.trim(), parsed);
        Alert.alert('Saque realizado', `Saque de R$ ${parsed.toFixed(2)} realizado na conta ${numero}`);
      } else {
        await ContaApiService.depositar(numero.trim(), parsed);
        Alert.alert('Depósito realizado', `Depósito de R$ ${parsed.toFixed(2)} realizado na conta ${numero}`);
      }
      setNumero('');
      setValor('');
    } catch (err: any) {
      console.error(err);
      // Tratamento de erro específico — backend pode retornar mensagens ou códigos
      const message = err?.response?.data?.message || err?.message || 'Erro ao executar operação';
      // identificar SaldoInsuficiente por mensagem ou código (ajustar conforme backend)
      if (message.toLowerCase().includes('saldo') || message.toLowerCase().includes('insuficiente')) {
        Alert.alert('Saldo insuficiente', 'Não há saldo suficiente para realizar o saque');
      } else {
        Alert.alert('Erro', message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimentação</Text>
      <AppInput label="Número da conta" placeholder="0000-0" value={numero} onChangeText={setNumero} />
      <AppInput label="Valor (R$)" placeholder="0.00" value={valor} onChangeText={setValor} keyboardType="numeric" />

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title={loading ? 'Processando...' : 'Sacar'} onPress={() => handleOperacao('saque')} disabled={loading} />
        </View>
        <View style={styles.button}>
          <Button title={loading ? 'Processando...' : 'Depositar'} onPress={() => handleOperacao('deposito')} disabled={loading} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  button: { flex: 1, marginHorizontal: 6 },
});

export default MovimentacaoScreen;
