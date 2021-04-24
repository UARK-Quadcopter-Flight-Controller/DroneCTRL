/*
 * This file holds the ThumbSticks
 */

import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated,  } from "react-native";

interface props {
  /**
   * Creates an instance of the callback function to hold the Thumbstock location.
   * Also checks if the ThumbStick is the Throttle or not
   *
   */
    thumbStickLocation: (x: number, y: number) => void;
    isThrottle?: boolean
};

class Draggable extends Component<props, {}> {
  /**
   * This class holds the draggability of the joyStick
   */
  constructor(props: props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1)
    };
  }

  componentWillMount() {
	/**
	 * Creates a panResponder that will move the joyStick and interact on gesture
	 */
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
          this.state.pan.setOffset({
            x: this._val.x,
            y:this._val.y
          })
          this.state.pan.setValue({ x:0, y:0})
        },
        onPanResponderMove: (e, gesture) => { this.boundsLimit(gesture.dx, gesture.dy) == false ? null : Animated.event([ 
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ], {useNativeDriver: false})(e, gesture); this.props.thumbStickLocation(this.state.pan.x._value, this.state.pan.y._value);},
        onPanResponderRelease: (e, gesture) => {
          Animated.spring(this.state.pan, {
            toValue: this.props.isThrottle ? { x:0, y:this.state.pan.y._value} : { x:0, y:0},
            friction: 100,
            useNativeDriver: false
          }).start();
          if(this.props.isThrottle) { this.props.thumbStickLocation(0, this.state.pan.y._value); }
          else { this.props.thumbStickLocation(0, 0); }
        }
      });
  }

  boundsLimit(x, y) {
	/**
	 * Checks to see if the x and the y that is given is within the bounds
	 *
	 * @param x holds the x value of where our gesture is currently
	 *
	 * @param y holds the y value of where our gesture is currently
	 *
	 * @returns true if the gesture is within bounds. Otherwise, false
	 */
	// console.log(x + " " + y, Date.now(), this.props.isThrottle)
	if((x > 80) || (x < -80))
	{
		//Change to send altitude change
		return false;
	}
	if((y > 80) || (y < -80))
	{
		//Change to send altitude change
		return false;
	}
    return true;
  }

  render() {
    return (
      <View style={{ width: "20%", alignItems: "center" }}>
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showDraggable) {
      return (
        <View style={{ position: "absolute" }}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, {opacity:this.state.opacity}]}
          />
        </View>
      );
    }
  }
}


export default class App extends Component<props, {}> {
	/**
	 * Holds both the Joystick and the boundary container
	 */
    constructor(props: props) {
        super();

    }

  render() {
    return (
	  <View style={styles.container}>
		<View style={styles.outerCircle}>
			<Draggable bounds="parent" isThrottle={this.props.isThrottle} thumbStickLocation={(x, y) => this.props.thumbStickLocation(x, y)}/>
		</View>
	  </View>
    );
  }
}

let CIRCLE_RADIUS = 25;
const styles = StyleSheet.create({
/**
 * This consists of all of the styles necessary in this portion of the app.
 *
 */
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