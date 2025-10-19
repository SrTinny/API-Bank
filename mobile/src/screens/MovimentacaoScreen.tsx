import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AppInput from '../components/AppInput';
import { ContaApiService } from '../api/ContaApiService';

const MovimentacaoScreen: React.FC<{ navigation?: any; route?: any; onBack?: () => void }> = ({ navigation, route, onBack }) => {
  const [numero, setNumero] = useState('');
  const [valor, setValor] = useState('');
  const [destino, setDestino] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initial = route?.params?.initialNumero;
    if (initial) setNumero(String(initial));
  }, [route]);

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

  const handleTransferencia = async () => {
    if (!numero.trim() || !valor.trim() || !destino.trim()) {
      Alert.alert('Campos obrigatórios', 'Número da conta origem, destino e valor são obrigatórios');
      return;
    }

    const parsed = Number(valor);
    if (Number.isNaN(parsed)) {
      Alert.alert('Valor inválido', 'Informe um número válido para o valor');
      return;
    }

    try {
      setLoading(true);
      await ContaApiService.transferir({ contaOrigem: numero.trim(), contaDestino: destino.trim(), valor: parsed });
      Alert.alert('Transferência realizada', `Transferência de R$ ${parsed.toFixed(2)} da conta ${numero} para ${destino} realizada com sucesso`);
      setNumero('');
      setDestino('');
      setValor('');
    } catch (err: any) {
      console.error(err);
      const message = err?.response?.data?.message || err?.message || 'Erro ao executar transferência';
      if (message.toLowerCase().includes('saldo') || message.toLowerCase().includes('insuficiente')) {
        Alert.alert('Saldo insuficiente', 'Não há saldo suficiente para realizar a transferência');
      } else {
        Alert.alert('Erro', message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {onBack && (
        <View style={{ marginBottom: 8 }}>
          <Button title="Voltar" onPress={onBack} />
        </View>
      )}
      <Text style={styles.title}>Movimentação</Text>
      <AppInput label="Número da conta" placeholder="0000-0" value={numero} onChangeText={setNumero} />
  <AppInput label="Conta destino (para transferência)" placeholder="0000-0" value={destino} onChangeText={setDestino} />
      <AppInput label="Valor (R$)" placeholder="0.00" value={valor} onChangeText={setValor} keyboardType="numeric" />

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title={loading ? 'Processando...' : 'Sacar'} onPress={() => handleOperacao('saque')} disabled={loading} />
        </View>
        <View style={styles.button}>
          <Button title={loading ? 'Processando...' : 'Depositar'} onPress={() => handleOperacao('deposito')} disabled={loading} />
        </View>
        <View style={styles.button}>
          <Button title={loading ? 'Processando...' : 'Transferir'} onPress={handleTransferencia} disabled={loading} />
        </View>
      </View>

      <View style={{ height: 16 }} />

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Reajustar (Poupança)" onPress={async () => {
            try {
              setLoading(true);
              await ContaApiService.reajustar(numero.trim(), 0.1);
              Alert.alert('Reajuste', 'Reajuste aplicado (10%)');
            } catch (err: any) {
              const message = err?.response?.data?.message || err?.message || 'Erro ao reajustar';
              Alert.alert('Erro', message);
            } finally { setLoading(false); }
          }} disabled={!numero.trim() || loading} />
        </View>
        <View style={styles.button}>
          <Button title="Ver saldos" onPress={async () => {
            try {
              setLoading(true);
              const conta = await ContaApiService.getConta(numero.trim());
              Alert.alert('Saldo', `Conta ${conta.numero}: R$ ${Number(conta.saldo).toFixed(2)}`);
            } catch (err: any) {
              const message = err?.response?.data?.message || err?.message || 'Erro ao buscar saldo';
              Alert.alert('Erro', message);
            } finally { setLoading(false); }
          }} disabled={!numero.trim() || loading} />
        </View>
        <View style={styles.button}>
          <Button title="Finalizar" onPress={() => {
            // volta para a tela de boas-vindas
            if (navigation) navigation.navigate('Welcome');
          }} />
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
