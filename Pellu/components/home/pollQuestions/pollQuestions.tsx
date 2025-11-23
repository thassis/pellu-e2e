import React, { useReducer } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../../../components/text/Text';
import useLogin from '../../../hooks/useLogin';
import { HomeService } from '../../../services/home';
import { IPollQuestion } from '../../../types/post.type';
import styles from './styles';

type EditableQuestion = IPollQuestion & { checked: boolean };

type Action = {
  type: 'TOGGLE_OPTION';
  payload: EditableQuestion;
  postId: string;
};

type QuestionProp = {
  question: EditableQuestion;
  userVotted: boolean;
  totalVotes: number;
  disabled?: boolean;
  onPress: () => void;
};

type PollQuestionsProp = {
  postId: string;
  questions: IPollQuestion[];
  votedPollQuestionId?: string;
  disabled?: boolean;
};

const getInitialState = (questions: IPollQuestion[], votedPollQuestionId?: string): EditableQuestion[] =>
  questions.map(option => ({ ...option, checked: votedPollQuestionId === option._id }));

const reducer = (state: EditableQuestion[], action: Action) => {
  switch (action.type) {
    case 'TOGGLE_OPTION':
      return state.map(option => {
        if (option.title === action.payload.title) {
          HomeService.votePoll(action.postId, option._id, option.checked);
          return { ...option, checked: !option.checked };
        }
        return { ...option, checked: false };
      });
    default:
      return state;
  }
};

const Question = ({
  question,
  totalVotes,
  userVotted,
  disabled = false,
  onPress,
}: QuestionProp) => {
  const { checked, numberVotes, title } = question;
  const votes = numberVotes + (checked ? 1 : 0);
  const percentage = (votes * 100) / totalVotes;
  return (
    <TouchableOpacity
      style={[
        styles.questionContainer,
        checked ? styles.clickedContainer : null,
      ]}
      disabled={disabled}
      onPress={onPress}>
      {userVotted && (
        <View
          style={[
            styles.fill,
            checked ? styles.fillChecked : styles.fillUnchecked,
            { width: `${percentage}%` },
          ]}
        />
      )}
      <View style={styles.textView}>
        <Text medium numberOfLines={1} style={styles.text}>
          {title}
        </Text>
      </View>
      {userVotted && (
        <Text style={[styles.text, styles.textPercentage]}>
          {percentage.toFixed(2)}%
        </Text>
      )}
    </TouchableOpacity>
  );
};

const PollQuestions = ({ postId, questions, disabled, votedPollQuestionId }: PollQuestionsProp) => {
  const { requireLogin } = useLogin();
  const [questionsCheck, dispatch] = useReducer(
    reducer,
    getInitialState(questions, votedPollQuestionId),
  );
  const userVotted = questionsCheck.some(q => q.checked);

  const getTotalVotes = () => {
    let total = questionsCheck.reduce((acc, current) => acc + current.numberVotes, 0);
    if (userVotted && !votedPollQuestionId) {
      total++;
    } else if (!userVotted && votedPollQuestionId) {
      total--;
    }
    return total;
  }


  const totalVotes = getTotalVotes();

  const handlePress = (question: EditableQuestion) => {
    requireLogin(() => dispatch({ type: 'TOGGLE_OPTION', payload: question, postId }), 'Login necessário', 'Faça login para votar');
  };

  return (
    <View style={styles.container}>
      {questionsCheck.map(question => (
        <Question
          key={question._id}
          question={question}
          totalVotes={totalVotes}
          onPress={() => handlePress(question)}
          userVotted={userVotted}
          disabled={disabled}
        />
      ))}
      <Text style={styles.totalVote}>{totalVotes} votos</Text>
    </View>
  );
};

export default PollQuestions;
