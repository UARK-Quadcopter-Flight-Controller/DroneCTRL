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
import { StyleSheet, Text, View , TouchableOpacity, useState} from 'react-native';
import TcpSocket from 'react-native-tcp-socket';

/**
 * Components
 */
import HUD from './components/HUD';

/**
 * Runs the main code of the app which is the combination of all of the components
 *
 * @returns a render of all the components together
 *
 * @alpha
 */

export default function App()
{
	return (
		<HUD/>
	);
}

/**
 * This consists of all of the styles necessary in the app.
 * Because the main app is made of components, this is not necessary.
 *
 * @alpha
 */
//const styles = StyleSheet.create ({})
