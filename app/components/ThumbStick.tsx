import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated,  } from "react-native";
import { map } from '../helpers/math'



interface props {
    thumbStickLocation: (x: number, y: number) => void;
    isThrottle?: boolean
};

class Draggable extends Component<props, {}> {
  constructor(props: props) {
    console.disableYellowBox = true;
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
      yRest: 0
    };
  }

  componentWillMount() {
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
            if(this.props.isThrottle)
            {
              this.state.pan.setOffset({
                  x:this._val.x,
                  y:this._val.y
              })
            }
            else
            {
              this.state.pan.setOffset({
                  x:0,
                  y:0
              })
            }
            //console.log(this._val.y)
            this.state.pan.setValue({ x:0, y:0})
          },
        onPanResponderMove: (e, gesture) => {this.boundsLimit(gesture.dx, gesture.dy, this._val.y) == false ? null : Animated.event([ 
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ], {useNativeDriver: false})(e, gesture); this.props.thumbStickLocation(map(this._val.x, -80, 80, -100, 100), map(this._val.y, 80, -80, -100, 100));},
        onPanResponderRelease: (e, gesture) => {
          Animated.spring(this.state.pan, {
            toValue: this.props.isThrottle ? { x:0, y:this.state.pan.y._value} : { x:0, y:0},
            friction: 500,
            useNativeDriver: false
          }).start();
          if(this.props.isThrottle) { this.props.thumbStickLocation(0, map(this._val.y, 80, -80, -100, 100)); }
          else { this.props.thumbStickLocation(0, 0); }
          this.setState({ yRest: this.state.pan.y._value})
        }
      });
  }

  boundsLimit(dx, dy, y) {
    //console.log(x + " " + y, Date.now(), this.props.isThrottle)
    // console.log(y)
    if((dx > 80) || (dx < -80))
    {
        //Change to send altitude change
        return false;
    }
    if(((y > 80) && (dy + y > 80)) || ((y < -80) && (dy + y < -80)))
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