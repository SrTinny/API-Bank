import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppButton from './src/components/AppButton';
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
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFB' }}>
      <Text style={styles.title}>API Bank</Text>
      <View style={{ width: '80%', marginTop: 24 }}>
        <AppButton title="Cadastrar Conta" onPress={() => navigation.navigate('Cadastrar')} />
      </View>
      <View style={{ width: '80%', marginTop: 12 }}>
        <AppButton title="Ir para Operações" onPress={() => navigation.navigate('Movimentacao')} />
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
  container: { flex: 1, backgroundColor: '#FAFAFB' },
  title: { fontSize: 22, fontWeight: '700', margin: 16, color: '#0F172A' },
  button: { marginHorizontal: 16, marginVertical: 8 },
  screen: { flex: 1 },
});

export default App;
