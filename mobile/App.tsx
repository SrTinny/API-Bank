import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import CadastrarContaScreen from './src/screens/CadastrarContaScreen';
import MovimentacaoScreen from './src/screens/MovimentacaoScreen';

const App: React.FC = () => {
  const [route, setRoute] = useState<'home' | 'cadastrar' | 'movimentacao'>('home');

  return (
    <SafeAreaView style={styles.container}>
      {route === 'home' && (
        <View>
          <Text style={styles.title}>API Bank (Mobile)</Text>
          <View style={styles.button}>
            <Button title="Cadastrar Conta" onPress={() => setRoute('cadastrar')} />
          </View>
          <View style={styles.button}>
            <Button title="Movimentação" onPress={() => setRoute('movimentacao')} />
          </View>
        </View>
      )}

      {route === 'cadastrar' && (
        <View style={styles.screen}>
          <Button title="Voltar" onPress={() => setRoute('home')} />
          <CadastrarContaScreen />
        </View>
      )}

      {route === 'movimentacao' && (
        <View style={styles.screen}>
          <Button title="Voltar" onPress={() => setRoute('home')} />
          <MovimentacaoScreen />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', margin: 16 },
  button: { marginHorizontal: 16, marginVertical: 8 },
  screen: { flex: 1 },
});

export default App;
