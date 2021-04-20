/*
 * This file holds the ThumbSticks
 */

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ThumbStick() {
  /**
   * Creates the Thumbsticks
   *
   * @returns a value of the thumbsticks
   */
  return (
    <View style={styles.container}>
        <View style={styles.outerCircle}>
        <View style={styles.innerCircle}></View>
        </View>
    </View>
  )
}

/**
 * This consists of all of the styles necessary in this portion of the app.
 *
 * @alpha
 */
const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    //   borderWidth: 1,
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