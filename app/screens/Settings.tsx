import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ThumbStick from "../components/ThumbStick";
import { screens } from "../types";

interface props {
    onScreenChange(screen: screens): void;
};


export default function Settings(props: props) {
    return (
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <ThumbStick></ThumbStick>
        </View>
    )
}
