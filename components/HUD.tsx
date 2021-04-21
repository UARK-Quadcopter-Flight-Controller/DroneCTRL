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
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import TcpSocket from 'react-native-tcp-socket';
import ThumbStick from "./ThumbStick";

/**
 * Runs the HUD which keeps track of the data being sent through HTTP/TCP/UDP protocols
 *
 * @remarks
 * The HTTP request is obtained from either localhost when running the mock-up ESP or jsonPlaceholder when testing without the local HTTP server
 *
 * @param props - Takes in a style if any is given
 *
 * @returns a render of the application
 *
 * @alpha
 */

export default function HUD(props)
{
	const [Data, setData] = useState(0);
	
	useInterval(() =>
	{
		setData(getESPData());
	}, 500);
	
	const getESPData = async () =>
	{
		try
		{
			//let response = await fetch('https://localhost:4000/endpoint');
			let response = await fetch('https://jsonplaceholder.typicode.com/users');
			let json = await response.json();
			return JSON.parse(json);
		}
		catch (error)
		{
			console.error(error);
		}
	}
	
	return (
		<View style={styles.container}>
			<ThumbStick/>
		</View>
	
		//<View style={styles.container}>
			//<Text>Open up App.tsx to start working on your app!</Text>
			//<StatusBar style="auto"/>
			
			//<TouchableOpacity onPress={() => alert('Hello World')} style={styles.button}>
				//<Text style={styles.buttonText}> Test </Text>
			//</TouchableOpacity>
		//</View>
	);
}

/**
 * A custom hook which does something every few intervals so that it can send HTTP requests
 *
 * @remarks
 * This function is from {@Link https://overreacted.io/making-setinterval-declarative-with-react-hooks/}
 * 
 * @param callback - Sends the function in the callback everytime on a tick and then saves the information in savedCallback
 * 
 * @param delay - The wait time for the interval
 *
 * @returns the output of clearInterval given setInterval's tick and delay
 *
 * @alpha
 */
function useInterval(callback, delay)
{
	const savedCallback = useRef();
	
	useEffect(() =>
	{
		savedCallback.current = callback;
	});
	
	useEffect(() =>
	{
		function tick()
		{
			savedCallback.current();
		}
		
		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay]);
}

/**
 * This consists of all of the styles necessary in this portion of the app.
 *
 * @remarks
 * This template is from https://docs.expo.io/tutorial/text/
 *
 * @alpha
 */
const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    outerCircle: {
      width: 165,
      height: 165,
      borderRadius: 100,
      backgroundColor: "#555",
      opacity: 0.7
    },
    innerCircle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#000",
        position: 'relative',
        top: 57,
        left: 57
    }
});
