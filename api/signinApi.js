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
    console.log('인가코드 전달 성공 :' , response.data);
    const { accessToken, refreshToken } = response.data;

    // 토큰 저장 
    await EncryptedStorage.setItem('accessToken', accessToken);
    console.log('kakao accessToken:', accessToken);
    await EncryptedStorage.setItem('refreshToken', refreshToken);
    console.log('kakao refreshToken:', refreshToken);

    return true;
  }
  catch (error) {
    console.error('인가코드 전달 실패 : ', error);
    return false;
  }
};


export const signIn = async (email, password) => {
  try {
    console.log('email, password : ', email, password);
    const response = await axiosInstance.post('/auth/sign-in', {
      email,
      password,
    });

    const { success, accessToken, refreshToken } = response.data;

    console.log(
      'success:', success,
      'accessToken:', accessToken,
      'refreshToken:', refreshToken
    );
  
    await EncryptedStorage.setItem('accessToken', accessToken);
    await EncryptedStorage.setItem('refreshToken', refreshToken);
    await EncryptedStorage.setItem('email', email);

    const storedAccessToken = await EncryptedStorage.getItem('accessToken');
    console.log('로컬에서 가져온 값 : ', storedAccessToken);
  
  } catch (error) {
    console.error('일반 로그인 중 실패 : ', error);
  }
};


export const kakaoLogin = async () => {
  try {
    const restApiKey = '65206fdd79e2cb40a2cfe63955968c83';
    const redirectUri = 'https://autobiography-9d461.web.app/auth/kakao/callback';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;

    console.log('link:',link);
        
    await EncryptedStorage.clear();

    const supported = await Linking.canOpenURL(link);
    console.log('can Open URL ?  : ', supported);

    // 인가코드 받아오기 
    if (supported) {

      // 리다이렉트 이벤트 리스너 등록 전에 기존 리스너 제거 
      Linking.removeEventListener('url', handleOpenURL);
      Linking.addEventListener('url', handleOpenURL);

      const openResult = await Linking.openURL(link);
      return openResult; // URL 열기 시도 결과 반환 
    
    } else {
      console.error("url 열기 실패");
      return false;
    }
  
  } catch (error) {
    console.error('카카오 로그인 실패 : ', error);
    return false;
  }
};

const handleOpenURL = async ({ url }) => {
  try {
    const code = new URL(url).searchParams.get('code');
    
    if(!code) {
      throw new Error('인가 코드를 URL에서 찾을 수 없습니다.');
    }

    // 인가 코드를 백엔드로 전달하고 응답받기 
    await sendCodeToBackend(code);
    console.log('인가 코드가 성공적으로 처리 되었습니다.');

  } 
  catch(error) {
    console.error('인가 코드 처리 과정에서 오류 발생', error);
  }
  finally {
    Linking.removeEventListener('url', handleOpenURL);
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

    await axiosInstance.post('/auth/sign-out', {access_token}, {
      headers: {
        Authorization: `Bearer ${access_Token}`,
    }});

    await EncryptedStorage.removeItem('refreshToken', 'accessToken');

    console.log('로그아웃 성공');
  } catch (error) {
    console.error('로그아웃 실패 : ', error);
  }
};