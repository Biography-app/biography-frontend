import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
const baseURL = 'https://autobiography-9d461.web.app';

// let accessToken = EncryptedStorage.getItem('accessToken');

/* 채리 comment
* reissueToken 함수 안에서는 업데이트 되지만, 요청 인터셉터에서 사용되는 accessToken은 이 업데이트를 반영하지 않음
* 따라서 요청 인터셉터 안에서 매번 encryptedStorage 에서 accessToken 을 가져오는 방식으로 변경 
*/

const reissueToken = async() => {

    try{
        const refreshToken = await EncryptedStorage.getItem('refreshToken');
        
        if(!refreshToken) {
            throw new Error('refreshToken이 존재하지 않습니다.');
        }

        const response = await axios.post(`${baseURL}/auth/renew`, { refreshToken });

        // console.log('accessToken : ',accessToken);
        console.log('newaccessToken:', response.data.accessToken);

        // 새로운 토큰 저장 - 채리 comment
        await EncryptedStorage.setItem('accessToken', response.data.accessToken); 
        return response.data.accessToken;
    
    } catch(error){
        console.error('토큰 재발급 실패 :', error);
        throw error;
    }
};

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(

    async(config) => {
        try{
            // const accessToken = EncryptedStorage.getItem('accessToken');
            // await 추가 - 채리 comment
            const accessToken = await EncryptedStorage.getItem('accessToken');
            config.headers['Content-Type'] = 'application/json';
            config.headers['Authorization'] = accessToken;
            //console추가 - 민지
            console.log('원래 요청 config: ' ,config);
            return config;

        } catch(error){
            console.error('요청 인터셉터 오류 :', error);
            return Promise.reject(error);
        }
    },
    (error)=>{
        console.error('요청 인터셉터 오류:',error);
        return Promise.reject(error);
    }
);
  

axiosInstance.interceptors.response.use( 
    //민지 - 1차 요청, 재요청 성공 여부 알기 위해 console.log 작성
    response => {
        console.log('성공!');
        return response},

    async(error) => {

        console.log('error response:',error.response.config.data);

        if(error.response && error.response.status == 401){
            try{
                // 변수 수정 - 채리 comment
                // const accessToken = await reissueToken();
                const newAccessToken = await reissueToken();
                console.log('accessToken :', newAccessToken);

                
                // error.config.headers = {
                //     'Content-Type' : 'application/json',
                //     Authorization: `Bearer ${accessToken}`,
                // };

                // 헤더 업데이트 - 채리 comment
                error.config.headers['Authorization'] = newAccessToken; 
                
                //console추가 - 민지
                console.log("오류 이후 config : ", error.config);
                //중단된 요청 토큰 갱신 후 재요청
                const response = await axios.request(error.config);
                console.log('response:', response);
                console.log('재요청 성공!');
                return response;

            } catch(reissueError){
                console.error('토큰 재발급 및 요청 재시도 실패:', reissueError);
                return Promise.reject(reissueError);
            }}

            return Promise.reject(error);
    }
);

export default axiosInstance;