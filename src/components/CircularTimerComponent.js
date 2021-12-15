import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';
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

/*

const [duration, setDuration] = useState(props.duration);
const [time, setTime] = useState(0);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const radius = 52.5;
const circumference = 2 * radius * 3.14159;
const cx = 57.5;
const cy = 57.5;
const strokeWidth = 5;
const size = radius * 2 + strokeWidth * 2;

const startTimer = () => {
  setTime(Date.now());
  Animated.timing(progress, {
    toValue: -circumference,
    duration: duration,
    useNativeDriver: true,
    easing: Easing.linear,
  }).start();
};

const stopTimer = () => {
  let timeDifference = Date.now() - time;
  setDuration(timeDifference);
  Animated.timing(progress).stop();
};
*/
