import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import usersStorage from '../storages/usersStorage';
import essaysStorage from '../storages/essaysStorage';
import MyEssayHeader from '../components/MyEssayHeader';
import { getUserProfile } from '../api/profileApi';


function Header({image, nickname}) {
  const imageSource = image ? {uri: image} : require('../assets/user.png');
  return (
    <View style={styles.headerBlock}>
      <Image source={imageSource} borderRadius={100} style={styles.image} />
      <Text style={styles.name}>{nickname}</Text>
    </View>
  );
}

function MyEssayScreen() {
  const [essayTitle, setEssayTitle] = useState('');
  const [essayBody, setEssayBody] = useState('');
  const [essayTime, setEssayTime] = useState();
  const [essayQuestion, setEssayQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [userImage, setUserImage] = useState();
  const [id, setId] = useState();
  const [isPublic, setIsPublic] = useState();

  useEffect(() => {
    const getStoredEssay = async () => {
      try {
        const storedEssays = await essaysStorage.get();
        if (storedEssays.length > 0) {
          const lastEssay = storedEssays[storedEssays.length - 1];
          setEssayTitle(lastEssay.title);
          setEssayBody(lastEssay.body);
          setEssayTime(lastEssay.createdAt);
          setEssayQuestion(lastEssay.question);
          setId(lastEssay.id);
          setIsPublic(lastEssay.isPublic);
        }
      } catch (error) {
        console.error('Error retrieving essay:', error);
      }
    };

    const getStoredUser = async () => {
      try {
        const image = await usersStorage.getImage();
        const nickname = await usersStorage.getNickname();

        if (nickname || image) {
          const imageUri = image || '';
          setUserImage(imageUri.toString());
          setNickname(nickname || '');
        } else {
          setUserImage('');
        }
      } catch (error) {
        console.error('Error retrieving user:', error);
      }
    };

    const fetchUserProfile = async() => {
      try{
        const profileData = await getUserProfile();
        setNickname(profileData.nickname);
        setUserImage(profileData.profilePicture);
      }catch(error){
        console.error('Failed to fetch user profile:', error);

      }
    };

    fetchUserProfile();
    
    
    const unsubscribe = navigation.addListener('focus', () => {
      getStoredEssay();
      getStoredUser();
    });
    return unsubscribe;
  }, [navigation]);

  const clearAsyncStorage = async () => {
    try {
      await essaysStorage.clear();
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
    }
  };

  const formatDate = time => {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    const formattedDate = new Date(time).toLocaleString(undefined, options);
    const [year, month, day] = formattedDate.split(/\D+/);

    return `${year}년 ${month}월 ${day}일`;
  };

  const navigation = useNavigation();

  const moveToHomeScreen = () => {
    navigation.navigate('Home');
  };

  const moveToMyPage = () => {
    navigation.navigate('MyPage');
  };

  const deleteEssay = async () => {
    try {
      await essaysStorage.remove(id);

      console.log('Essay deleted successfully');

      navigation.navigate('MyPage');
    } catch (error) {
      console.error('Error deleting essay:', error);
    }
  };

  return (
    <View style={styles.block}>
      <MyEssayHeader
        id={id}
        title={essayTitle}
        body={essayBody}
        question={essayQuestion}
        onDelete={deleteEssay}
        isPublic={isPublic}
      />
      <Button title="Clear AsyncStorage" onPress={clearAsyncStorage} />
      <View style={styles.content}>
        <Header image={userImage} nickname={nickname} />
        <Text style={styles.question}>{essayQuestion}</Text>
        <Text style={styles.title}>{essayTitle}</Text>
        <View>
          <Text style={styles.content}>{essayBody}</Text>
        </View>
        <Text style={styles.date}>{formatDate(essayTime)}</Text>

        <Button title="Move to HomeScreen" onPress={moveToHomeScreen} />
        <Button title="Move to MyPage" onPress={moveToMyPage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  image: {
    height: 40,
    width: 40,
  },
  settingHeader: {},
  //텍스트
  name: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    paddingBottom: 2,
    paddingHorizontal: 15,
    paddingBottom: 30,
    fontWeight: 'bold',
  },
  content: {fontSize: 14, paddingHorizontal: 30, paddingBottom: 70},
  date: {paddingLeft: 10},
});
export default MyEssayScreen;
