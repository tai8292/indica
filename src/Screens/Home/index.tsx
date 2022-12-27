import { useNavigation } from '@react-navigation/native';
import { useStoreActions } from '@Store';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IProps {}

const Home: React.FC<IProps> = () => {
  const navigation = useNavigation();
  const { loginFacebook, loginGoogle } = useStoreActions((actions) => actions.auth);

  const onLoginFacebook = async () => {
    try {
      await loginFacebook();
      navigation.navigate('ListChat');
    } catch (error) {
      Alert.alert('Error', 'Something wrong happen, please try again!');
    }
  };

  const onLoginGoogle = async () => {
    try {
      await loginGoogle();
      navigation.navigate('ListChat');
    } catch (error) {
      Alert.alert('Error', 'Something wrong happen, please try again!');
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.btn} onPress={onLoginFacebook}>
        <Text style={styles.txt}>Login facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onLoginGoogle}>
        <Text style={styles.txt}>Login google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  txt: {
    fontSize: 16,
  },
  btn: {
    marginVertical: 16,
  },
});

export default Home;
