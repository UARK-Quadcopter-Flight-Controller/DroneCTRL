/*
 * Team 3:
 * Champion: Alex Cutsinger
 * CSCE: Lily Phu, Zachary Heil, Stephanie Phillips, Spencer Ward, Dishoungh White II
 * ELEG: Zachary Heil, Andy McCoy, Joel Parker, Christ Somphounout
 * 
 * Comments will be in accordance to {@Link https://tsdoc.org/} and changes will be noted in github.
 *
 * Imports below
 */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';

/**
 * Runs the main code of the app
 *
 * @remarks
 * This template is from {@Link https://docs.expo.io/tutorial/text/}
 *
 * @returns a render of the application
 *
 * @beta
 */

export default function App() {
  return (
    <View style={styles.container}>
		<Text>Open up App.tsx to start working on your app!</Text>
		<StatusBar style="auto"/>
		
		<TouchableOpacity onPress={() => alert('Hello World')} style={styles.button}>
			<Text style={styles.buttonText}> Test </Text>
		</TouchableOpacity>
    </View>
  );
}

/**
 * Runs the main code of the app
 *
 * @remarks
 * This template is from https://docs.expo.io/tutorial/text/
 *
 * @returns a render of the application
 *
 * @alpha
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
	backgroundColor: "blue",
	padding: 20,
	borderRadius: 5,
  },
  buttonText: {
	fontsize: 20,
	color: '#fff',
  },
});
