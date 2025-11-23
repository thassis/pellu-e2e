import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../components/text/Text';
import TextInput from '../components/TextInput/TextInput.web';

import { LoginNextScreen } from '@/types/screen.type';
import { showAlert } from '@/utils/Alert';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { setAxiosJwtToken } from '../apis/axios';
import { UserApi } from '../apis/user.api';
import LogoIcon from '../assets/svg/logo.icon';
import { UserStorage } from '../asyncStorage/user.storage';
import GoBack from '../components/goBack/GoBack';
import PrimaryButton from '../components/primaryButton/PrimaryButton';
import { useStore } from '../zustand/useStore';

const LoginScreen = () => {
  const { nextScreen } = useLocalSearchParams<{ nextScreen?: LoginNextScreen }>();
  const { addUser, cleanPosts } = useStore(state => ({
    addUser: state.addUser,
    cleanPosts: state.cleanPosts,
  }));

  const { navigate, replace } = useRouter();
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    try {
      const isValid = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (email && isValid) {
        setLoading(true);
        const res = await UserApi.checkEmail(email);
        if (res.registeredEmail) {
          setShowPasswordInput(true);
        } else {
          navigate({ pathname: 'register-ask-is-ong', params: { email } });
        }
        setHasError(false);
      } else {
        setHasError(true);
        showAlert('Email inválido', 'Digite um email válido');
      }
    } catch (e) {
      setHasError(true);
      showAlert('Erro', 'Verifique se seu email está correto e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await UserApi.doLogin({ email, password });
      await UserStorage.set(user);
      setAxiosJwtToken(user.token);
      addUser(user);
      cleanPosts();
      replace(nextScreen as never || '/home');
    } catch (error) {
      showAlert('Login inválido', 'Email ou senha inválidos');
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const status = await UserApi.requestResetPassword(email);
      navigate({ pathname: 'forgot-password', params: { email } });
    } catch (error: any) {
      if (error?.status === 429) {
        showAlert('Erro', 'Muitas tentativas, tente novamente mais tarde');
        return;
      }
      showAlert('Erro', 'Erro ao solicitar redefinição de senha');
    }
  }

  const disableButton = email.length === 0;

  return (
    <View style={styles.page}>
      {showPasswordInput && (
        <GoBack onPress={() => setShowPasswordInput(false)} />
      )}
      <View style={styles.container}>
        <View style={styles.icon}>
          {!showPasswordInput ? (
            <LogoIcon />
          ) : (
            <View style={styles.passwordContainer}>
              <Text medium style={styles.title}>
                Olá!
              </Text>
              <Text style={styles.email}>{email}</Text>
            </View>
          )}
        </View>
        <View style={styles.body}>
          {!showPasswordInput ? (
            <>
              <Text style={[styles.text, styles.emailText]}>
                Para continuar, digite seu e-mail
              </Text>
              <TextInput
                autoFocus
                value={email}
                onChangeText={e => setEmail(e?.toLowerCase())}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="done"
                onSubmitEditing={handleSendEmail}
                autoCapitalize="none"
                error={hasError}
              />
            </>
          ) : (
            <View style={styles.passwordBottom}>
              <Text style={styles.text}>Agora, digite sua senha</Text>
              <TextInput
                autoFocus
                value={password}
                onChangeText={e => setPassword(e)}
                placeholder="Senha"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                autoCapitalize="none"
                error={hasError}
                keyboardType="default"
                secureTextEntry
              />
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text link style={styles.password}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <PrimaryButton
          title={showPasswordInput ? 'Entrar' : 'Continuar'}
          loading={loading}
          disabled={disableButton}
          style={styles.button}
          onPress={showPasswordInput ? handleLogin : handleSendEmail}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  button: {
    marginBottom: 24,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
  },
  passwordContainer: {
    bottom: 50,
    alignItems: 'center',
  },
  passwordBottom: {
    bottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#000',
    marginLeft: 6,
    marginBottom: 12,
  },
  title: {
    color: '#000',
    fontSize: 26,
  },
  emailText: {
    marginTop: 36,
  },
  email: {
    color: '#000',
    fontSize: 16,
  },
  password: {
    marginLeft: 8,
    marginTop: 4,
    fontSize: 14,
  }
});
