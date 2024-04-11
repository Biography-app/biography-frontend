import axios from 'axios';
import { Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';


const axiosInstance = axios.create({
  baseURL: 'https://autobiography-9d461.web.app',
});
//headers - 필요 X

// 인가코드를 백엔드로 전달 
const sendCodeToBackend = async (code) => {
  try {

    const response = await axios.post('/auth/kakao/callback' , { code });
    const { accessToken, refreshToken } = response.data;

    // 토큰 저장 
    await EncryptedStorage.setItem('accessToken', accessToken);
    await EncryptedStorage.setItem('refreshToken', refreshToken);

  }
  catch (error) {
    console.error('인가코드 전달 실패 : ', error);
  }
};


export const signIn = async (email, password) => {
  try {
    console.log('email, password : ', email, password);
    const response = await axiosInstance.post('/auth/sign-in', {
      email,
      password,
    console.log('email, password : ', email, password);
    const response = await axiosInstance.post('/auth/sign-in', {
      email,
      password,
    });


    const { success, accessToken, refreshToken } = response.data;
    const { success, accessToken, refreshToken } = response.data;

    console.log(
      'success:', success,
      'accessToken:', accessToken,
      'refreshToken:', refreshToken
      'success:', success,
      'accessToken:', accessToken,
      'refreshToken:', refreshToken
    );

    await EncryptedStorage.setItem('accessToken', accessToken);
    await EncryptedStorage.setItem('refreshToken', refreshToken);
    await EncryptedStorage.setItem('email', email);

    const storedAccessToken = await EncryptedStorage.getItem('accessToken');
    console.log('로컬에서 가져온 값 : ', storedAccessToken);
  
    await EncryptedStorage.setItem('accessToken', accessToken);
    await EncryptedStorage.setItem('refreshToken', refreshToken);
    await EncryptedStorage.setItem('email', email);

    const storedAccessToken = await EncryptedStorage.getItem('accessToken');
    console.log('로컬에서 가져온 값 : ', storedAccessToken);
  
  } catch (error) {
    console.error('일반 로그인 중 실패 : ', error);
  }
};

// 카카오 로그인 수정 필요!
// 카카오 로그인 수정 필요!
export const kakaoLogin = async () => {
  try {
    const restApiKey = '65206fdd79e2cb40a2cfe63955968c83';
    const redirectUri = 'https://autobiography-9d461.web.app/auth/kakao/callback';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
        
    const supported = await Linking.canOpenURL(link);

    // 인가코드 받아오기 
    if (supported) {

      // 리다이렉트 이벤트 리스너 등록
      const handleOpenURL = ({ url }) => {
        // URL에서 인가 코드 추출
        const code = new URL(url).searchParams.get('code');
        if (code) {
          // 인가 코드를 백엔드로 전달하는 함수 호출
          sendCodeToBackend(code);
        }
        // 이벤트 리스너 제거
        Linking.removeEventListener('url', handleOpenURL);
      };
  
      Linking.addEventListener('url', handleOpenURL);
      await Linking.openURL(link);
    
    } else {
      console.error("url 열기 실패");
    }
  
  } catch (error) {
    console.error('카카오 로그인 실패 : ', error);
  }
};

export const reissueTokens = async () => {
  try {
    const refreshToken = await EncryptedStorage.getItem("refreshToken");
    const response = await axiosInstance.post('/auth/renew', { refreshToken });
    return response.data; // 수정 필요
  } catch (error) {
    console.error('토큰 재발급 실패 : ', error);
    throw error;
  }
};

export const sign_out = async () => {
  try {
    const access_Token = await EncryptedStorage.getItem('accessToken');
    const access_Token = await EncryptedStorage.getItem('accessToken');

    await axiosInstance.post('/auth/sign-out', {access_token}, 
    {
      headers: {
        Authorization: `Bearer ${access_Token}`,
    await axiosInstance.post('/auth/sign-out', {access_token}, 
    {
      headers: {
        Authorization: `Bearer ${access_Token}`,
      },
    });
    });

    await EncryptedStorage.removeItem('refreshToken', 'accessToken');
    console.log('로그아웃 성공');
    console.log('로그아웃 성공');
  } catch (error) {
    console.error('로그아웃 실패 : ', error);
  }
};