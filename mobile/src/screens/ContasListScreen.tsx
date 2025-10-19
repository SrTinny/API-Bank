import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import AppButton from '../components/AppButton';
import ContaCard from '../components/ContaCard';
import { useContaStore } from '../context/useContaStore';
import { IConta } from '../types/Conta';
import { useApiCall } from '../hooks/useApiCall';
import { ContaApiService } from '../api/ContaApiService';

const ContasListScreen: React.FC = () => {
  const { contas, setContas } = useContaStore((s) => ({ contas: s.contas, setContas: s.setContas }));

  const { data, loading, error, call } = useApiCall<IConta[], []>(ContaApiService.getAllContas as any);

  useEffect(() => {
    (async () => {
      const d = await call();
      if (d) setContas(d as any);
    })();
  }, [call, setContas]);

  return (
  <SafeAreaView style={styles.container}>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Contas</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={{ width: '100%', marginVertical: 12 }}>
          <AppButton title="Atualizar" onPress={() => call().then((d) => d && setContas(d as any))} />
        </View>
      </View>
      <FlatList
        data={contas}
        keyExtractor={(item) => String(item.id ?? item.numero)}
        renderItem={({ item }) => <ContaCard conta={item} />}
        contentContainerStyle={{ padding: 16 }}
        refreshing={loading}
        onRefresh={() => call().then((d) => d && setContas(d as any))}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFB' },
  title: { fontSize: 20, fontWeight: '700', padding: 16, color: '#0F172A' },
  error: { color: '#DC2626', paddingHorizontal: 16 },
});

export default ContasListScreen;
