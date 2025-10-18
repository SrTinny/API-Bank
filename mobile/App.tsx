import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CadastrarContaScreen from './src/screens/CadastrarContaScreen';
import MovimentacaoScreen from './src/screens/MovimentacaoScreen';

type RootStackParamList = {
  Home: undefined;
  Cadastrar: undefined;
  Movimentacao: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.title}>API Bank (Mobile)</Text>
      <View style={styles.button}>
        <Button title="Cadastrar Conta" onPress={() => navigation.navigate('Cadastrar')} />
      </View>
      <View style={styles.button}>
        <Button title="Movimentação" onPress={() => navigation.navigate('Movimentacao')} />
      </View>
    </View>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'API Bank' }} />
          <Stack.Screen
            name="Cadastrar"
            component={CadastrarContaScreen as any}
            options={{ title: 'Cadastrar Conta' }}
          />
          <Stack.Screen
            name="Movimentacao"
            component={MovimentacaoScreen as any}
            options={{ title: 'Movimentação' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', margin: 16 },
  button: { marginHorizontal: 16, marginVertical: 8 },
  screen: { flex: 1 },
});

export default App;
