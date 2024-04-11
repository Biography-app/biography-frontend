import {React, useState} from 'react';
import {TextInput, View, Text, StyleSheet, Button} from 'react-native';
import {normalsignUp} from '../api/signupApi';

//이메일, password를 이전 화면에서 가지고 와야겠네... 내일하고 서버 작성 다 완료하깅.
function RegisterInfoScreen({route, navigation}) {
  if (!route || !route.params) {
    return (
      <View>
        <Text>Error route params</Text>
      </View>
    );
  }

  const {text, password} = route.params;
  const [name, onChangeName] = useState('');
  const [phone, onChangePhone] = useState();
  const [bday, onChangeBday] = useState();
  const [nickname, onChangeNickname] = useState('');

  const handleInfo = async () => {
    try {
      console.log(
        'text, password, name, phone, bday, nickname:',
        text,
        password,
        name,
        phone,
        bday,
        nickname,
      );
      await normalsignUp(text, password, name, phone, bday, nickname);
      navigation.navigate('SetupProfile');
    } catch (error) {
      console.log(name, phone, bday, nickname);
      console.error('회원가입 정보 전달 실패:', error);
    }
  };

  return (
    <View>
      <Text style={styles.titleText}>아랫 칸에 해당 정보를 기입해주세요.</Text>
      <View>
        <View>
          <Text>"성명 입력. 다른 사람들에겐 보이지 않습니다"</Text>
          <TextInput
            style={styles.input}
            placeholder="이름 입력"
            value={name}
            onChangeText={onChangeName}
          />
        </View>
        <View>
          <Text>"숫자로 된 11자 입력. 예)01011112222"</Text>
          <TextInput
            style={styles.input}
            placeholder="전화번호 입력"
            value={phone}
            onChangeText={onChangePhone}
          />
        </View>
        <View>
          <Text>"생년월일 8자 입력. 예) 19001122"</Text>
          <TextInput
            style={styles.input}
            placeholder="생년 월일 입력"
            value={bday}
            onChangeText={onChangeBday}
          />
        </View>
        <View>
          <Text>"닉네임 입력"</Text>
          <TextInput
            style={styles.input}
            placeholder="닉네임 입력"
            value={nickname}
            onChangeText={onChangeNickname}
          />
        </View>
        <Button title="다음" onPress={handleInfo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default RegisterInfoScreen;
