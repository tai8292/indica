import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IProps {}

const Home: React.FC<IProps> = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ListChat')}>
        <Text style={styles.txt}>Login facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
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
