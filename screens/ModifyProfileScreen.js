import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import SettingHeader from '../components/SettingHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary} from 'react-native-image-picker';
import usersStorage from '../storages/usersStorage';
import {createProfile} from '../api/profileApi';
import EncryptedStorage from 'react-native-encrypted-storage';
// import axios  from 'axios';

// const reissueToken = async() => {

//   try{
//       const refreshToken = await EncryptedStorage.getItem('refreshToken');
//       const response = await axios.post(`${baseURL}/auth/renew`,{refreshToken: refreshToken},{headers: {'Content-Type' : 'application/json'}});

  
//   console.log('newaccessToken:', response.data.accessToken);

//   // 새로운 토큰 저장 - 채리 comment
//   await EncryptedStorage.setItem('accessToken', response.data.accessToken); 
//   return response.data.accessToken;
  
//   } catch(error){
//       console.error('토큰 재발급 실패 :', error);
//       throw error;
//   }
// };

// const baseURL = 'https://autobiography-9d461.web.app';

function ModifyProfileScreen({route, navigation}) {
  const{
    nickname: initialNickname,
  } = route.params||{};
  const [oneliner, setOneliner] = useState(''); //한줄소개
  const [response, setResponse] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  //const [nickname, setNickname] = useState(initialNickname || '');
  const [nickname, setNickname] = useState(null);


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
        //저장소에 이미지 저장은 아니고 profileImage에 새로운 상태 업데이트.
      },
    );
  };

  const moveToSetupProfile = () => {
    navigation.navigate('SetupProfile');
  };
  const moveToMainTab = () => {
    navigation.navigate('MainTab');
  };
  const onChangeText = text => {
    setOneliner(text);
  };

  const onChangeNickname = text => {
    setNickname(text);
  };

  const changeUserProfile = async () => {
    try {
      await createProfile(nickname, oneliner, profileImage);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  // const changeUserProfile = async() => {
  //   const beforeaccessToken = await EncryptedStorage.getItem('accessToken');
  //   const newAccessToken = await reissueToken();
  //   console.log('accessToken:' ,newAccessToken);
  // }
  const deleteImage = async () => {
    try {
      await usersStorage.delete();
      setResponse(null);
      const profileImage = await usersStorage.getImage();
      console.log(profileImage);
      console.log('User profileImage deleted successfully');
    } catch (error) {
      console.error('Error deleting user profile:', error);
    }
  };

  const Menu = props => {
    return (
      <View style={styles.menuBlock}>
        <Text style={styles.menuText}>{props.title}</Text>
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.block}>
        {/*헤더블럭*/}
        <View style={styles.headerBlock}>
          <SettingHeader title="프로필 관리" />
          {/*변경하기버튼*/}
          <View style={styles.btnWrapper}>
            <View style={styles.changeBtn}>
              <Pressable onPress={changeUserProfile}>
                <Text>변경하기</Text>
              </Pressable>
            </View>
          </View>
          {/*변경하기 버튼 블럭*/}
        </View>
        {/*헤더블럭*/}
        <View style={styles.profileBlock}>
          <View style={styles.imageBlock}>
            <Menu title={'이미지'} />

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                style={styles.circle}
                source={
                  response
                    ? {uri: response?.assets[0]?.uri}
                    : require('../assets/user.png')
                }
              />

              <View style={styles.twoBtn}>
                <Pressable style={styles.imageBtn} onPress={onSelectImage}>
                  <Text style={styles.btnText}>등록</Text>
                </Pressable>
                <Pressable style={styles.imageBtn}>
                  <Text style={styles.btnText} onPress={deleteImage}>
                    삭제
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.nameBlock}>
            <Menu title={'닉네임'} />
            <View>
              <TextInput
                defaultValue={initialNickname}
                onChangeText={onChangeNickname}
                value={nickname}
              />
            </View>
          </View>
          <View style={styles.introduceBlock}>
            <Menu title={'한줄 소개'} />
            <View>
              <TextInput
                defaultValue={"한줄 소개를 입력해주세요."}
                onChangeText={onChangeText}
                value={oneliner}
              />
              <Button title={'프로필설정이동'} onPress={moveToSetupProfile} />
              <Button title={'메인탭이동'} onPress={moveToMainTab} />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default ModifyProfileScreen;

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBlock: {flex: 2, justifyContent: 'center'},
  circle: {
    // flex: 1,
    marginBottom: 80,
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  nameBlock: {flex: 1, marginVertical: 5},
  introduceBlock: {flex: 3},
  btnWrapper: {
    height: 50,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 65,
    height: 25,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1.5,
  },
  profileBlock: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 30,
  },
  menuBlock: {
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  pictureBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  imageBtn: {
    width: 40,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 5,
  },
  btnText: {
    fontSize: 14,
  },
  twoBtn: {
    marginTop: 10,
    flexDirection: 'row',
  },
});
