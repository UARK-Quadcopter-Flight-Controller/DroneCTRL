import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { screens } from "../types";

interface props {
  onScreenChange(screen: screens): void;
}

export default function Error(props: props) {
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
