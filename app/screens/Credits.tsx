/*
 * This file displays credits where they are due
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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

export default function Credits(props: props) {
  return (
    <View style={styles.container}>
      <Text>
        {
          "Icons made by <a href='https://www.freepik.com' title='Freepik'>Freepik</a> from <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a></div>"
        }
      </Text>
      <Text>
        {
          "<div>Icons made by <a href='https://www.flaticon.com/authors/eucalyp' title='Eucalyp'>Eucalyp</a> from <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a></div>"
        }
      </Text>
      <TouchableOpacity
        onPress={() => props.onScreenChange("settings")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Restart App</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * This consists of all of the styles necessary in this portion of the app.
 *
 * @alpha
 */
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
