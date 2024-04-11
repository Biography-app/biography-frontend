import React, {useState} from 'react';
import {SafeAreaView, TextInput, StyleSheet, View, Text} from 'react-native';
import WriteHeader from '../components/WriteHeader';
import {postEssay} from '../api/essayApi';

function Question(props) {
  return (
    <View style={styles.question}>
      <Text style={styles.questionText}>{props.ask}</Text>
    </View>
  );
}

function PageScreen({route, navigation}) {
  // title, body 구분에서 -> Essay로 수정.
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [essays, setEssays] = useState();

  const saveEssay = async publicStatus => {
    try {
      console.log('received isPublic:', publicStatus);

      //새로운 Essay 객체 생성.
      const newEssay = {
        id: Date.now(),
        title: title,
        body: body,
        question: question,
        isPublic: publicStatus,
      };

      //그리고 storage에 업데이트된 Essays 저장.
      //await essaysStorage.set(newEssay);

      await postEssay(title, body, publicStatus);
      console.log('Essay saved successfully');
    } catch (error) {
      console.error('Error saving essay:', error);
    }
  };
  const {question} = route.params || {};
  const SeparatorView = () => {
    return <View style={styles.listItemSeparatorStyle} />;
  };

  return (
    <SafeAreaView style={styles.block}>
      <WriteHeader onSave={saveEssay} />
      <SeparatorView />
      <View style={styles.block}>
        {question && <Question ask={question} />}

        <TextInput
          placeholder="제목을 입력하세요"
          style={styles.titleInput}
          returnKeyType="next"
          value={title}
          onChangeText={value => setTitle(value)}
        />

        <TextInput
          placeholder="내용을 입력하세요"
          style={styles.bodyInput}
          multiline
          textAlignVertical="top"
          value={body}
          onChangeText={value => setBody(value)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  listItemSeparatorStyle: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#c8c8c8',
  },
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
    borderBottomWidth: 0.5,
    flex: 1,
  },
  bodyInput: {
    fontSize: 16,
    paddingTop: 10,
    color: '#263238',
    flex: 4,
  },
  listItemSeparatorStyle: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#c8c8c8',
  },
  question: {
    flex: 1,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default PageScreen;
