import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  Button,
} from 'react-native';
import {reqEmailver, checkEmailver} from '../api/signupApi';

//회원가입 화면

function SignUpScreen({navigation}) {
  const [text, setText] = useState('');  //이메일
  const [number, setNumber] = useState(''); //인증번호
  const [password, setPassword] = useState(''); //비밀번호
  const [certification, setCertification] = useState('');
  


  const handleEmailVerification = async () => {
    try {
      const certificationKey = await reqEmailver(text);
      // reqEmailver 함수에서 반환된 인증 키(certification key)를 사용할 수 있습니다.
      console.log('text:', text);
      console.log('인증 키:', certificationKey);
      setCertification(certificationKey);
    } catch (error) {
      console.log('text:', text);
      console.error('이메일 인증 요청 실패:', error);
    }
  };

  const moveToRegiInfo = () => {
    console.log('text:', text, 'password:', password);
    navigation.navigate('RegisterInfo', {text, password});
  };

  const handleEmailVerCheck = async () => {

    try {
      console.log('인증확인 certification:', certification);
      console.log('number : ', number);
      const is_validated = await checkEmailver(certification, number);
      console.log('is_validated :', is_validated);
      // is_validated 값에 따라 다른 동작 수행 가능
      if (is_validated === 0) {
        console.log('이메일 인증 성공!');
        // 성공한 경우에 수행할 동작 추가
      } else {
        console.log('이메일 인증 실패!');
        // 실패한 경우에 수행할 동작 추가
      }
    } catch (error) {
      console.error('이메일 인증 확인 실패: ', error);
      // 에러 처리
    }
  };

  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.block}>
        <TextInput
          placeholder="이메일 입력"
          value={text}
          onChangeText={value => setText(value)}
          style={styles.inputStyle}
        />
        <Button title="인증하기" onPress={handleEmailVerification} />
        <TextInput
          placeholder="인증번호 입력"
          value={number}
          onChangeText={value => setNumber(value)}
          style={styles.inputStyle}
        />
        <Button title="확인" onPress={handleEmailVerCheck} />
        <TextInput 
          placeholder="비밀번호 입력" 
          secureTextEntry={true}
          style={styles.inputStyle} 
          value={password} 
          onChangeText={value => setPassword(value)} 
        />
        <TextInput placeholder="비밀번호 재입력" style={styles.inputStyle} />
        <Button title="다음" onPress={moveToRegiInfo} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  inputStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    borderBottomWidth: 0.5,
    flex: 1,
  },
});

export default SignUpScreen;
