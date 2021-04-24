/*
 * This file focuses on fine-tuning the settings when the app takes off
 */

import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ThumbStick from "../components/ThumbStick";
import { screens } from "../types";

interface props {
  /**
   * Creates an instance of the callback function to change screens
   *
   * @remarks
   * Calls the screenchange which will change the app.tsx
   */
    onScreenChange(screen: screens): void;
};


export default function Settings(props: props) {
  /**
   * Shows the settings page
   * 
   * @privateRemarks
   *
   * Needs to be an actual settings page instead of blank
   *
   * @param props holds information from other screens
   * 
   * @returns text that states the settings
   * 
   */
    return (
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <ThumbStick></ThumbStick>
        </View>
    )
}
