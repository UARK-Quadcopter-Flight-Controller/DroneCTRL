import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { screens } from "../types";
import { changeOrientationPortrait } from "../helpers/orientation";
import * as Location from "expo-location";
import droneImage from "../assets/drone-logo.png";

// @ts-ignore: Intellisense doesn't recognize @appconfig as a source and will yell about it
import { OVERRIDE_LOADING_SCREEN_LOCKOUT } from "@appconfig";
import { screenPortrait } from "../hooks/screenOrientation";

// README: This file needs some cleaning up. I was initially just testing the location
// permissions and first launch on the loading screen was a good place if any to try
// implementing that. For a 'release' it is probably best to ensure location is enabled
// and that there is access to the drone network (bypassed with OVERRIDE_LOADING...)

interface props {
  onScreenChange(screen: screens): void;
}

export default function Loading(props: props) {
  // Enfore portrait orientation
  screenPortrait();

  // State variables
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Connecting to GPS...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // In the case that we are not connected to the ESP and are developing,
  // we can use the .env parameter to override the "am I connected" check
  if (location) {
    // On the fly replace current location with ENGR yard so I don't dox myself
    location.coords.latitude = 36.068429;
    location.coords.longitude = -94.170765;
    
    (async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: location }),
      };
      fetch("http://192.168.1.11:4000/seed", requestOptions);
    })();
    if (OVERRIDE_LOADING_SCREEN_LOCKOUT) {
      // TODO: causes a warning as it is not use in a useEffect block
      // setTimeout is a temporary measure
      setTimeout(() => {
        props.onScreenChange("fly");
      }, 100);
    } else {
      // TODO: check to see if connected to drone network with tcp request
    }
  }

  const spinValue = new Animated.Value(0);

  // Set up animation for spinning logo
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 1000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg']
  })

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Animated.Image
          style={{transform: [{rotate: spin}], width: '80%', resizeMode: 'center', marginBottom: -30}}
          source={droneImage} 
        />
        <Text style={styles.logo}>DroneCTRL</Text>
        <ActivityIndicator />
        <Text>{text}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 60,
    color: 'white',
    marginBottom: 20
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
