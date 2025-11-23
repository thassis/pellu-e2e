import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import OutlinedTextInput from '../../../components/OutlinedTextInput.tsx/OutlinedTextInput.tsx';
import Avatar from '../../../components/avatar/Avatar';
import Text from '../../../components/text/Text';
import { logEvent } from '../../../logs/analytics';
import Colors from '../../../utils/Colors';
import { useStore } from '../../../zustand/useStore';
import styles from './styles';

type InputCommentProps = {
  onSubmitComment: (comment: string) => void;
  closeModal: () => void;
};

const InputComment = ({ onSubmitComment, closeModal }: InputCommentProps) => {
  const { navigate } = useRouter();
  const { user } = useStore(state => ({
    user: state.user,
  }));

  const [text, setText] = React.useState('');

  const goToLogin = () => {
    logEvent('login_from_comment');

    closeModal();
    navigate({ pathname: '/login', params: { nextScreen: '/home' } });
  };

  const handleSubmitComment = (comment: string) => {
    onSubmitComment(comment);
    setText('');
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Avatar pictureName={user.picture} />
        <OutlinedTextInput
          value={text}
          onChangeText={setText}
          maxLength={255}
          placeholder="Adicione um comentário..."
          onSubmitEditing={() => handleSubmitComment(text)}
          returnKeyType="send"
          right={
            <TouchableOpacity style={styles.send} onPress={() => handleSubmitComment(text)}>
              <Ionicons name="send" size={20} color={Colors.gray} />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
  return (
    <View style={[styles.container, styles.loginContainer]}>
      <Text link onPress={goToLogin}>
        Clique aqui para fazer login e comentar
      </Text>
    </View>
  );
};

export default InputComment;
