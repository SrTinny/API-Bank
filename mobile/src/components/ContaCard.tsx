import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconTransfer from './icons/IconTransfer';
import { IConta } from '../types/Conta';

const bgColorForTipo = (tipo: string) => {
  switch (tipo) {
    case 'ESPECIAL':
      return '#F97316'; // laranja
    case 'POUPANCA':
      return '#10B981'; // verde
    case 'COMUM':
    default:
      return '#3B82F6'; // azul
  }
};

const ContaCard: React.FC<{ conta: IConta }> = ({ conta }) => {
  return (
    <View style={[styles.card, { borderLeftColor: bgColorForTipo(conta.tipo_conta) }]}>
      <View style={styles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconTransfer size={18} color="#6B7280" />
          <Text style={[styles.titular, { marginLeft: 8 }]}>{conta.titular}</Text>
        </View>
        <Text style={styles.tipo}>{conta.tipo_conta}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.numero}>#{conta.numero}</Text>
        <Text style={styles.saldo}>R$ {Number(conta.saldo).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E6E9EE',
    shadowColor: 'transparent',
    elevation: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titular: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  tipo: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  numero: {
    fontSize: 14,
    color: '#6B7280',
  },
  saldo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
});

export default ContaCard;
