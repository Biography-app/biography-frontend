import axios from 'axios';
const baseURL = 'https://autobiography-9d461.web.app';
const axiosInstance = axios.create({
  baseURL: 'https://autobiography-9d461.web.app',
  headers: {
    'Content-Type': 'application/json',
  },
});




// export const reqEmailver = async email => {
//   try {
//     const response = await axiosInstance.post('/auth/email', { email : email });

//     if(response.data && response.data.certification_key){
//       console.log('인증번호가 발송되었습니다. 이메일을 확인해주세요.');
//       alert('인증번호가 발송되었습니다. 이메일을 확인해주세요.');
//     }
//     else {
//       throw new Error('이메일 인증 실패');
//     }
//     return response.data.certification_key;

//   } catch (error) {
//     console.error('이메일 인증 요청 실패 : ', error);
//     alert('이메일 인증 요청 실패 : ' + error.message);
//   }
// };

export const reqEmailver = async email => {
  try {
    const response = await axiosInstance.post('/auth/email', { email : email });

    if(response.data && response.data.certification_key){
      console.log('인증번호가 발송되었습니다. 이메일을 확인해주세요.');
      alert('인증번호가 발송되었습니다. 이메일을 확인해주세요.');
    }
    else {
      throw new Error('이메일 인증 실패');
    }
    return response.data.certification_key;

  } catch (error) {
    console.error('이메일 인증 요청 실패 : ', error);
    alert('이메일 인증 요청 실패 : ' + error.message);
  }
};

export const checkEmailver = async (cert_key, cert_code) => {
  try {
    console.log('넘어온 값 : ', cert_key, cert_code);
    const response = await axiosInstance.post(
      '/auth/email/validation',
      {
        certification_key: cert_key,
        certification_code: cert_code,
      },
    );

    const validate = response.data.is_validated;
    console.log('is_validated 값 : ', validate);
    return validate;
  } catch (error) {
    console.error('이메일 인증확인 실패 : ', error);
  }
};

export const normalsignUp = async (email, password, name, tel, birth, nickname) => {
  try {
    const response = await axiosInstance.post('/auth/sign-up', {
      email,
      password,
      name,
      tel,
      birth,
      nickname,
    });

    const success = response.data.success;
    const detail = response.data.detail;
    console.log('success : ', success, 'detail : ', detail);
    console.log(
      'sucess가 0이면 성공, 1이면 실패, 실패인 경우 detail이 이유를 반환함. ',
    );
    return response;
  } catch (error) {
    console.error('일반 회원가입 중 실패 : ', error);
  }
};