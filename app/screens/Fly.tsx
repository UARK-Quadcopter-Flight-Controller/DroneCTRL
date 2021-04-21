import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import {
  changeOrientationLandscape,
  getDeviceHeight,
  getDeviceWidth,
} from "../helpers/orientation";
import { screens } from "../types";
import * as Location from "expo-location";
import markerImage from "../assets/pilotsm.png";
import { useMountEffect } from "../helpers/hookHelpers";
import ThumbStick from "../components/ThumbStick";

// @ts-ignore: Intellisense doesn't recognize @env as a source and will yell about it
// import { TODO } from "@env"; was using this for mapbox, but is !compatible with expo

interface props {
  onScreenChange(screen: screens): void;
}

export default function Fly(props: props) {
  // Enforce landscape-right orientation
  changeOrientationLandscape();

  // Get the current location
  const [location, setLocation] = useState({ lat: 0.0, lon: 0.0 });

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      // Do not have access
      alert("Please enable location services to continue.");
      return;
    }

    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 10,
      },
      (location) => {
        // console.log("is this running?", new Date().toISOString())
        setLocation({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
      }
    );
  };

  // Get Data from Drone HTTP API
  const [droneData, setDroneData] = useState(null);
  useEffect(() => {
    const getDroneData = async () => {
      fetch("http://192.168.1.11:4000/getData")
        .then((result) => result.json())
        .then((result) => {
          console.log(result.data, new Date().toISOString());
          setDroneData(result.data);
        })
        .catch((e) => (console.log("There was an issue fetching from the URL given")));
    };
    getDroneData();
    const interval = setInterval(() => getDroneData(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Call hook for phone location API 
  useMountEffect(getLocation);
  return (
    <View style={styles.container} pointerEvents="none">
      <MapView
        style={{
          width: getDeviceHeight(),
          height: getDeviceWidth(),
        }}
        showsCompass
        legalLabelInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
        camera={{
          center: { latitude: location.lat, longitude: location.lon },
          heading: 0,
          pitch: 100,
          zoom: 100,
          altitude: 0.003,
        }}
      >
        <Marker
          coordinate={{ latitude: location.lat, longitude: location.lon }}
          image={markerImage}
        />
      </MapView>
      <View style={styles.txt}>
        <ThumbStick />
      </View>
      {/* <Text style={styles.txt}>
        TODO: this map will not have touch interaction and will animate to
        current location {"\n"}
        Only "touchable" things here should be joysticks and settings button {"\n"}
        Location: LAT = {location.lat}, LON = {location.lon}
      </Text> */}
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
    bottom: 10,
    left: 40,
    position: "absolute",
    color: "red",
  },
});
