/*
 * This file tells the user that they received an error and they need to restart the app
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { screens } from "../types";

interface props {
  /**
   * Creates an instance of the callback function to change screens
   *
   * @remarks
   * Calls the screenchange which will change the app.tsx
   */
  onScreenChange(screen: screens): void;
}

export default function Error(props: props) {
  /**
   * An error occurred therefore the app stops everything and displays the error
   * 
   * @param props holds information from other screens
   *
   * @returns an error
   * 
   */
  return (
    <View style={styles.container}>
      <Text>Something went wrong</Text>
      <TouchableOpacity
        onPress={() => props.onScreenChange("loading")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Restart App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
/**
 * This consists of all of the styles necessary in this portion of the app.
 *
 */
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
