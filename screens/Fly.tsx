import MapView from "react-native-maps";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { changeOrientationLandscape } from "../helpers/orientation";
import { screens } from "../types";

// @ts-ignore: Intellisense doesn't recognize @env as a source and will yell about it
// import { TODO } from "@env"; was using this for mapbox, but is !compatible with expo

const screen = Dimensions.get("screen");

interface props {
  onScreenChange(screen: screens): void;
}

export default function Fly(props: props) {
  // Enfore landscape-right orientation
  changeOrientationLandscape();

  //   const {height, width} = Dimensions.get('window');
  const [dimensions, setDimensions] = useState({ screen });

  const onChange = ({ screen }) => {
    setDimensions({ screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  return (
    <View style={styles.container}>
      <MapView style={{ width: screen.width, height: screen.height }} />
      <Text style={styles.txt}>
        TODO: this map will not have touch interaction and will animate to
        current location {"\n"}
        Only "touchable" things here should be joysticks and settings button
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    textAlign: "center",
    position: "absolute",
    color: "red",
  },
});
