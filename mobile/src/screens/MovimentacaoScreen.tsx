import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AppButton from '../components/AppButton';
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
        // Antes de depositar, buscar a conta e confirmar titular com o usuário
        try {
          const conta = await ContaApiService.getConta(numero.trim());
          Alert.alert(
            'Confirmar Depósito',
            `Titular: ${conta.titular}\nDeseja confirmar o depósito de R$ ${parsed.toFixed(2)} na conta ${numero}?`,
            [
              { text: 'Cancelar', style: 'cancel' },
              {
                text: 'Confirmar',
                onPress: async () => {
                  try {
                    await ContaApiService.depositar(numero.trim(), parsed);
                    // Buscar e exibir saldo atualizado
                    const updated = await ContaApiService.getConta(numero.trim());
                    Alert.alert('Depósito realizado', `Depósito de R$ ${parsed.toFixed(2)} realizado. Saldo atual: R$ ${Number(updated.saldo).toFixed(2)}`);
                  } catch (err2: any) {
                    const msg2 = err2?.response?.data?.message || err2?.message || 'Erro ao executar depósito';
                    Alert.alert('Erro', msg2);
                  }
                }
              }
            ]
          );
        } catch (err2: any) {
          const message = err2?.response?.data?.message || err2?.message || 'Conta não encontrada';
          Alert.alert('Erro', message);
        }
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
          <AppButton title="Voltar" onPress={onBack} variant="outline" />
        </View>
      )}
      <Text style={styles.title}>Movimentação</Text>
      <AppInput label="Número da conta" placeholder="0000-0" value={numero} onChangeText={setNumero} />
  <AppInput label="Conta destino (para transferência)" placeholder="0000-0" value={destino} onChangeText={setDestino} />
      <AppInput label="Valor (R$)" placeholder="0.00" value={valor} onChangeText={setValor} keyboardType="numeric" />

      <View style={styles.buttonGrid}>
        <AppButton style={styles.buttonItem} title={loading ? 'Processando...' : 'Sacar'} onPress={() => handleOperacao('saque')} loading={loading} variant="primary" />
        <AppButton style={styles.buttonItem} title={loading ? 'Processando...' : 'Depositar'} onPress={() => handleOperacao('deposito')} loading={loading} variant="primary" />
        <AppButton style={styles.buttonItem} title={loading ? 'Processando...' : 'Transferir'} onPress={handleTransferencia} loading={loading} variant="primary" />
      </View>

      <View style={{ height: 16 }} />

      <View style={styles.buttonGrid}>
  <AppButton style={styles.buttonItem} title="Reajustar (Poupança)" onPress={async () => {
            try {
              setLoading(true);
              await ContaApiService.reajustar(numero.trim(), 0.1);
              Alert.alert('Reajuste', 'Reajuste aplicado (10%)');
            } catch (err: any) {
              const message = err?.response?.data?.message || err?.message || 'Erro ao reajustar';
              Alert.alert('Erro', message);
            } finally { setLoading(false); }
        }} disabled={!numero.trim() || loading} variant="outline" />

        <AppButton title="Ver saldos" onPress={async () => {
            try {
              setLoading(true);
              const conta = await ContaApiService.getConta(numero.trim());
              Alert.alert('Saldo', `Conta ${conta.numero}: R$ ${Number(conta.saldo).toFixed(2)}`);
            } catch (err: any) {
              const message = err?.response?.data?.message || err?.message || 'Erro ao buscar saldo';
              Alert.alert('Erro', message);
            } finally { setLoading(false); }
        } } disabled={!numero.trim() || loading} style={styles.buttonItem} variant="outline" />

        <AppButton style={styles.buttonItem} title="Finalizar" onPress={() => {
          if (navigation) navigation.navigate('Welcome');
        }} variant="outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FAFAFB', flex: 1 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#0F172A' },
  buttonGrid: { flexDirection: 'column', justifyContent: 'flex-start', marginTop: 12 },
  buttonItem: { width: '100%', marginVertical: 8 },
});

export default MovimentacaoScreen;
