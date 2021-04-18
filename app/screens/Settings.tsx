import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { screens } from "../types";

interface props {
    onScreenChange(screen: screens): void;
};


export default function Settings(props: props) {
    return (
        <View>
            <Text>Settings Page</Text>
        </View>
    )
}
