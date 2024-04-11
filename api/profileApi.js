import EncryptedStorage from 'react-native-encrypted-storage';
import axiosInstance from './axiosInstance';
import axios from 'axios';
const baseURL = 'https://autobiography-9d461.web.app';

export const createProfile = async (nickname, introduce, profilePicture) => {
  //let accessToken = await EncryptedStorage.getItem('accessToken');
  let useremail = await EncryptedStorage.getItem('email');
  console.log("useremail", useremail);
  console.log("닉네임, 한줄 소개, 사진 : ", nickname, introduce, profilePicture);
  const accessToken = await EncryptedStorage.getItem('accessToken');
  try {
    const response = await axiosInstance.put(
      '/api/profile',
      JSON.stringify({
        nickname: nickname,
        introduce: introduce,
        profilePicture: profilePicture,
        username : useremail,
      }),
    );

    console.log('프로필이 성공적으로 저장되었습니다 : ', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    }};



    // export const getUserProfile = async() => {
    //   try{

    //     const response = await axiosInstance.get('/api/profile')
    //     console.log("사용자 정보 : ", response.data);

    //     return response.data;
    //   }catch(error){
    //     console.error('사용자 프로필 정보 가져오기 실패 : ', error);
    //     throw error;
    //   }
    // };


 