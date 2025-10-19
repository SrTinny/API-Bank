import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CadastrarContaScreen from './src/screens/CadastrarContaScreen';
import MovimentacaoScreen from './src/screens/MovimentacaoScreen';
import { SafeAreaView } from 'react-native';

type RootStackParamList = {
  Welcome: undefined;
  Cadastrar: undefined;
  Movimentacao: { initialNumero?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const WelcomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.title}>Bem-vindo ao API Bank</Text>
      <View style={styles.button}>
        <Button title="Cadastrar Conta" onPress={() => navigation.navigate('Cadastrar')} />
      </View>
      <View style={styles.button}>
        <Button title="Ir para Operações" onPress={() => navigation.navigate('Movimentacao')} />
      </View>
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'API Bank' }} />
          <Stack.Screen
            name="Cadastrar"
            component={CadastrarContaScreen as any}
            options={{ title: 'Cadastrar Conta' }}
          />
          <Stack.Screen
            name="Movimentacao"
            component={MovimentacaoScreen as any}
            options={{ title: 'Operações' }}
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
