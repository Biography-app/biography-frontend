import { React, useState } from 'react';
import { Button, TextInput, StyleSheet, View } from 'react-native';
import { kakaoLogin, signIn } from '../api/signinApi';

function SignInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  const requestSignin = async () => {
    try {
      
      const response = await signIn(email, password);
      navigation.navigate('ModifyProfile');
      
    } catch (error) {
      console.error('일반 로그인 요청 실패 : ', error);
    }
    
  };

  const requestKakaoLogin = async () => {
    try {
      await kakaoLogin();
      console.log('카카오 로그인 성공');
      navigation.navigate('ModifyProfile');
    }
    catch(error) {
      console.error('카카오 로그인 요청 실패 : ' ,  error);
    }
  }

  return (
    <>
      <View>
        <TextInput
          placeholder="이메일"
          style={styles.input}
          value={email}a
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          placeholder="비밀번호"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={value => setPassword(value)}
        />
      </View>
      <Button title="로그인" style={styles.button} onPress={requestSignin} />
      <Button title="카카오 로그인" style={styles.button} onPress={requestKakaoLogin} />
    </>
  );
}

const styles = StyleSheet.create({
  block: {},
  input: {},
  button: {
    color: 'pink',
    backgroundColor: 'pink',
  },
});

export default SignInScreen;