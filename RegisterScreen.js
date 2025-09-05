
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const apiKey = 'patYv8nOFa3EcVPkA.11620e619a7f8e25bf483d66cb58aba543cb175f77d9b43d9339a71c26e41c17';
  const baseId = 'appj7BbRELCefo8we';
  const tableName = 'Table1';

  const handleRegister = async () => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            email,
            password,
          },
        }),
      });
      const json = await response.json();
      if (response.ok) {
         setError(' تم السجيل بنجاح  ');
      } else {
        setError('حدث خطأ أثناء التسجيل');
        console.error(json);
      }
    } catch (error) {
      setError('حدث خطأ أثناء التسجيل');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.text}>login</Text>
      </TouchableOpacity>
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
  text: {
    color: 'blue',
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default RegisterScreen;
