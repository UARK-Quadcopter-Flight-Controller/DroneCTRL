import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated,  } from "react-native";

class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1)
    };
  }

  componentWillMount() {
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
        onPanResponderMove: (e, gesture) => { this.boundsLimit(this.state.pan.x._value, this.state.pan.y._value) == false ? null : Animated.event([ 
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ])(e, gesture)},
        onPanResponderRelease: (e, gesture) => {
          Animated.spring(this.state.pan, {
            toValue: { x:0, y:0},
            friction: 100
          }).start();
        }
      });
  }

  boundsLimit(x, y) {
	//console.log(x + " " + y)
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


export default class App extends Component {
  render() {
    return (
	  <View style={styles.container}>
		<View style={styles.outerCircle}>
			<Draggable bounds="parent"/>
		</View>
	  </View>
    );
  }
}

let CIRCLE_RADIUS = 25;
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