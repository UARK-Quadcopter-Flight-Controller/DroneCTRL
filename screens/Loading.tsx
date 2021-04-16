import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { screens } from "../types";
import { changeOrientationPortrait } from "../helpers/orientation";
import * as Location from "expo-location";

// @ts-ignore: Intellisense doesn't recognize @appconfig as a source and will yell about it
import { OVERRIDE_LOADING_SCREEN_LOCKOUT } from "@appconfig";

// README: This file needs some cleaning up. I was initially just testing the location
// permissions and first launch on the loading screen was a good place if any to try
// implementing that. For a 'release' it is probably best to ensure location is enabled
// and that there is access to the drone network (bypassed with OVERRIDE_LOADING...)




interface props {
  onScreenChange(screen: screens): void;
}

export default function Loading(props: props) {
  // Enfore portrait orientation
  changeOrientationPortrait();

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

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // In the case that we are not connected to the ESP and are developing,
  // we can use the .env parameter to override the "am I connected" check
  if (location) {
    if (OVERRIDE_LOADING_SCREEN_LOCKOUT) {
      setTimeout(() => {
        props.onScreenChange("fly");
      }, 3000);
    } else {
      // TODO: check to see if connected to drone network with tcp request
    }
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {/* Add logo with this img here https://www.flaticon.com/free-icon/drone_1013307?term=drone&related_id=1013307 
                Attribution has already been given in the credits screen
            */}
        <ActivityIndicator />
        <Text>Connecting to the Quadcopter: {text}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
