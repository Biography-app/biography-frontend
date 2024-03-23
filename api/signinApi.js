import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const baseURl = '';

// 일반로그인 
export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${baseURl}/auth/sign-in`, {
      email: email,
      password: password,
    });

    const success = response.data.success;
    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;

    await EncryptedStorage.setItem('accessToken', response.data.access_token);
    await EncryptedStorage.setItem('refreshToken', response.data.refresh_token);

    console.log(
      'success',
      success,
      'access_token : ',
      access_token,
      'refresh_token : ',
      refresh_token,
    );

    //response 응답 자체를 리턴하고,
  } catch (error) {
    console.error('일반 로그인 중 실패 : ', error);
  }
};


//카카오 로그인은 잘 모르겠다.
export const kakaoLogin = async () => {
  try {
    const response = await axios.get(`${baseURl}/auth/kakao/callback`);

    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;

    await EncryptedStorage.setItem('accessToken', response.data.access_token);
    await EncryptedStorage.setItem('refreshToken', response.data.refresh_token);

    console.log(
      'access_token: ',
      access_token,
      'refresh_token: ',
      refresh_token,
    );

  } catch (error) {}
};

export const sign_out = async () => {
  try {
    const access_token = await EncryptedStorage.getItem('accessToken');

    await axios.post(
      `{baseUrl}/auth/sign-out`,
      {access_token},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    await EncryptedStorage.removeItem('refreshToken', 'accessToken');
    console.log('로그아웃 성공 : ', error);
  } catch (error) {
    console.error('로그아웃 실패 : ', error);
  }
};
