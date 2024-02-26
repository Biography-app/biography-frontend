import axios from 'axios';

//글 작성하기
const postEssay = async (title, content, secret) => {
  try {
    const response = await axios.post('/api/board/saveForm', {
      title: title,
      content: content,
      secret: secret,
    });

    console.log('게시글이 성공적으로 올라갔습니다:', response.data); //
    return response.data;
  } catch (error) {
    console.error('게시글을 올리는 도중 오류 발생함:', error);
    throw error;
  }
};

//이후에 postEssay함수 활용해 게시글 올림 postArticle('게시글 제목', '게시글 내용', true); 이렇게 작성함.

//글 수정하기
const updateEssay = async (id, title, content) => {
  try {
    const response = await axios.put('/api/board/{id}', {
      title: title,
      content: content,
    });
    console.log('에세이가 성공적으로 수정되었습니다:', response.data);
    return response.data;
  } catch (error) {
    console.error('에세이 수정 중 오류 발생 : ', error);
    throw error;
  }
};

//아래의 내용 참고하여 사용.
// const essayId = 'your-essay-id'; // 수정할 에세이의 ID
// const updatedTitle = '새로운 에세이 제목'; // 수정할 제목
// const updatedContent = '새로운 에세이 내용'; // 수정할 내용

// updateEssay(essayId, updatedTitle, updatedContent);

//글 삭제하기
const deleteEssay = async id => {
  try {
    const response = await axios.delete('/api/board/{id}');
    console.log('에세이가 성공적으로 삭제됨:', response.data);
    return response.data;
  } catch (error) {
    console.error('에세이 삭제 중 오류 발생:', error);
    throw error;
  }
};

// const essayId = 'your-essay-id'; // 삭제할 에세이의 ID
// deleteEssay(essayId);
export default essayApi;
