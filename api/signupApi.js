import axios from 'axios';

const axiosInstance = axios.create({ 
  baseURL : 'https://autobiography-9d461.web.app' });

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

//`${baseUrl}/auth/email/validation`
export const checkEmailver = async (certificationkey, certificationcode) => {
  try {
    console.log('넘어온 값 : ', certificationkey, certificationcode);
    const response = await axios.post(
      `${baseUrl}/auth/email/validation`,
      JSON.stringify({
        certification_key: certificationkey,
        certification_code: certificationcode,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const validate = response.data.is_validated;
    //is_validated는 0또는 1을 가지고 있을 것.
    //인증 성공시 0반환, 실패시 1반환.
    console.log('is_validated 값 : ', validate);
    return validate;
  } catch (error) {
    console.error('이메일 인증확인 실패 : ', error);
  }
};

export const normalsignUp = async (email, password, name, tel, birth) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/sign-up`, {
      email: email,
      password: password,
      name: name,
      tel: tel,
      birth: birth,
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