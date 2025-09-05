
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const apiKey = 'patYv8nOFa3EcVPkA.11620e619a7f8e25bf483d66cb58aba543cb175f77d9b43d9339a71c26e41c17';
  const baseId = 'appj7BbRELCefo8we';
  const tableName = 'Table1';

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=AND(email='${email}', password='${password}')`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = await response.json();
      if (json.records.length > 0) {
        navigation.navigate('Home', { userData: json.records[0].fields });
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.text} onPress={() => navigation.navigate('Register')}>Creat new account!</Text>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
