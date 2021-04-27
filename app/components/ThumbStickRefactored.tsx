import React from 'react'
import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native'

// This was a todo to re-write the thunbstick as a react native function component

interface props {
    onStickChange: (x: number, y: number) => void;
    StickyXAxis?: boolean;
    StickyYAxis?: boolean;
    InitialX?: number;
    InitialY?: number;  
};

export default function ThumbStickRefactored(props: props) {
    
    const [pan, setPan] = useState<Animated.ValueXY>(new Animated.ValueXY())

    const panResponder = useRef(
        PanResponder.create({
            // Ask to be the responder
            onStartShouldSetPanResponder: (e: GestureResponderEvent, g: PanResponderGestureState) => true,
            
            // Callback for when someone has initiated a touch event on the thumbstick
            onPanResponderGrant: (e: GestureResponderEvent, g: PanResponderGestureState) => {
                // if(withinThumbStickBounds(g.dx, g.dy, )) {}
            },
            
            // Callback for when someone is moving their finger on the thumbstick
            onPanResponderMove: (e: GestureResponderEvent, g: PanResponderGestureState) => {

            },
            
            // Callback for when someone releases their finger from the thumbstick
            onPanResponderRelease: (e: GestureResponderEvent, g: PanResponderGestureState) => {

            }
        })

    const withinThumbStickBounds = (dx: number, dy: number, y: number) => {
      if(dx > 80 || dx < -80) { return false; }
      if((y > 80 && dy + y > 80) || (y < -80 && dy + y < -80)) { return false; }
      return true;
    }

    const renderThumbStick: JSX.Element | undefined = () => {
        return(
            <View>
                <Animated.View 
                //   {panResponder.panHandlers}
                />
            </View>
        );
    }
    
    return (
      <View style={styles.container}>
		<View style={styles.outerCircle}>
		  {/* <Draggable bounds="parent" isThrottle={this.props.isThrottle} thumbStickLocation={(x, y) => this.props.thumbStickLocation(x, y)}/> */}
		</View>
	  </View>
    )
}

const CIRCLE_RADIUS = 25;
const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexDirection: 'column',
      //backgroundColor: 'yellow', //Testing
    },
    outerCircle: {
      width: 165,
      height: 165,
      borderRadius: 100,
      backgroundColor: "#555",
      opacity: 0.7,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      backgroundColor: "#000",
      width: CIRCLE_RADIUS * 2,
      height: CIRCLE_RADIUS * 2,
      borderRadius: CIRCLE_RADIUS,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      top: -25	//Find a better way to do this
    },
    text: {
      marginTop: 25,
      marginLeft: 5,
      marginRight: 5,
      textAlign: "center",
      color: "#fff",
      fontSize: 25,
      fontWeight: "bold"
    }
  });
