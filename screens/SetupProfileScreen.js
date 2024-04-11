import React, {useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Text,
  Pressable,
  TextInput,
  Button,
} from 'react-native';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';
import usersStorage from '../storages/usersStorage';
import {createProfile} from '../api/profileApi';

function SetupProfileScreen({navigation}) {
  const [oneliner, setOneliner] = useState('');
  const [response, setResponse] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState('');

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setResponse(res);
        setProfileImage(res?.assets[0]?.uri);
        //저장소에 이미지 저장은 아니고 profileImage에 새로운 상태 업데이또.
      },
    );
  };

  const onChangeText = text => {
    setOneliner(text);
  };

  const onChangeNickname = text => {
    setNickname(text);
  };
  const moveToModifyProfile = () => {
    navigation.navigate('ModifyProfile');
  };

  const saveUserProfile = async () => {
    try {
      const newUser = {
        profileImage: profileImage || '',
        oneliner: oneliner || '',
        nickname: nickname || '',
      };
      await usersStorage.set(newUser);
      console.log('User profile saved successfully');

      await createProfile(nickname, oneliner, profileImage);
      navigation.push('ModifyProfile', {
        oneliner,
        profileImage,
        nickname,
      });
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.imageUpload}>이미지 등록 (선택)</Text>
        <Pressable onPress={onSelectImage}>
          <Image
            style={styles.circle}
            source={
              response
                ? {uri: response?.assets[0]?.uri}
                : require('../assets/user.png')
            }
          />
        </Pressable>

        <View style={styles.form}>
          <BorderedInput
            placeholder="한 줄 소개 작성 (선택)"
            value={oneliner}
            profile={styles.profile}
            onChangeText={onChangeText}
            returnKeyType="done"
          />
          <BorderedInput
            placeholder="닉네임 작성"
            value={nickname}
            profile={styles.profile}
            onChangeText={onChangeNickname}
            returnKeyType="done"
          />
          <CustomButton title="완료" onPress={saveUserProfile} />
          <CustomButton title="프로필 수정" onPress={moveToModifyProfile} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    // flex: 1,
  },
  fullscreen: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 64,
  },
  imageUpload: {
    padding: 20,
  },
  circle: {
    // flex: 1,
    marginBottom: 30,
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {justifyContent: 'center'},
  profile: {height: 128, width: 128},
});

export default SetupProfileScreen;
