/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  const [text, setText] = useState('');
  const [list, setList] = useState('');
  const [isupdated, setUpdated] = useState(null);
  const [cardIndex, setCardIndex] = useState('');

  // const [my, set] = useState('');
  useEffect(() => {
    getDatabase();
  }, []);
  // const [data, setData] = useState('');
  const change = async () => {
    try {
      const response = await database()
        .ref(`todo/${cardIndex}`)
        .update({value: text});
      setUpdated(null);
      setText('');
    } catch (error) {
      console.log(error);
    }
  };
  const getDatabase = async () => {
    try {
      //const data = await database().ref('todo').once('value');
      const data = await database()
        .ref('todo')
        .on('value', tempData => {
          setList(tempData.val()); ///with the help of .on method we are able to fetch data when called upon
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handle = async () => {
    try {
      const index = list.length;
      const response = await database().ref(`todo/${index}`).set({
        value: text,
      });
    } catch {}
    setText('');
  };
  const seeUpdate = (index, value) => {
    setCardIndex(index);
    setUpdated(true);
    setText(value);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.mainHeafing}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter any value"
          value={text}
          onChangeText={value => setText(value)}></TextInput>
      </View>
      <View style={styles.buttonArea}>
        {!isupdated ? (
          <TouchableOpacity style={styles.button} onPress={handle}>
            <Text style={styles.butt}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={change}>
            <Text style={styles.butt}>Update</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.heading}>Todo List</Text>
        <FlatList
          data={list}
          renderItem={oye => {
            if (oye.item !== null) {
              console.log(oye);
              return (
                <View style={styles.card}>
                  <TouchableOpacity
                    style={styles.cardText}
                    onPress={() => seeUpdate(oye.index, oye.item.value)}>
                    <Text>{oye.item.value}</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainHeafing: {
    fontWeight: 'bold',
    fontSize: 40,
    alignSelf: 'center',
    marginTop: 10,
  },
  input: {
    width: 350,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
  },
  cardText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#00aaff',
    width: 200,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  butt: {
    color: 'white',
    fontSize: 20,
  },
  buttonArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: 350,
    borderRadius: 20,
    padding: 20,
    margin: 15,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 40,

    marginTop: 20,
  },
});

export default App;
