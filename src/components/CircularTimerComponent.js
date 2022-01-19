import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

class CircularTimerComponent extends Component {
  constructor(props) {
    super(props);

    this.progress = new Animated.Value(0);

    this.AnimatedCircle = Animated.createAnimatedComponent(Circle);

    this.radius = 52.5;
    this.circumference = 2 * this.radius * 3.14159;
    this.cx = 57.5;
    this.cy = 57.5;
    this.strokeWidth = 5;
    this.size = this.radius * 2 + this.strokeWidth * 2;

    this.state = {
      time: 0,
      duration: props.duration,
    };
  }

  startTimer = () => {
    this.setState({ time: Date.now() });
    console.log(this.state.duration);
    Animated.timing(this.progress, {
      toValue: -this.circumference,
      duration: this.state.duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  stopTimer = () => {
    let timeDifference = this.state.duration - (Date.now() - this.state.time);
    this.setState({ duration: timeDifference });
    Animated.timing(this.progress).stop();
  };

  render() {
    return (
      <Svg
        height={this.size}
        width={this.size}
        style={{
          zIndex: -1,
          transform: [{ rotate: '-90deg' }],
          position: 'absolute',
        }}>
        <this.AnimatedCircle
          fill={'none'}
          stroke={'white'}
          strokeWidth={this.strokeWidth}
          r={this.radius}
          cx={this.cx}
          cy={this.cy}
          strokeDasharray={[this.circumference, this.circumference]}
          strokeDashoffset={this.progress}
        />
        <Circle
          fill={'none'}
          stroke={'rgba(255, 255, 255, 0.25)'}
          strokeWidth={this.strokeWidth}
          r={this.radius}
          cx={this.cx}
          cy={this.cy}
        />
      </Svg>
    );
  }
}

export default CircularTimerComponent;
