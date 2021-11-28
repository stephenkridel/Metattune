import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularTimerComponent = props => {
  var progress = useRef(new Animated.Value(0)).current;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const radius = 52.5;
  const circumference = 2 * radius * 3.14159;
  const cx = 57.5;
  const cy = 57.5;
  const strokeWidth = 5;
  const size = radius * 2 + strokeWidth * 2;

  const startTimer = () => {
    Animated.timing(progress, {
      toValue: -circumference,
      duration: props.duration,
      useNativeDriver: true,
    }).start();
  };

  const stopTimer = () => {
    Animated.timing(progress).stop();
  };

  useEffect(() => {
    if (props.timerIsRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  return (
    <Svg
      height={size}
      width={size}
      style={{
        zIndex: -1,
        transform: [{ rotate: '-90deg' }],
        position: 'absolute',
      }}>
      <AnimatedCircle
        fill={'none'}
        stroke={'white'}
        strokeWidth={strokeWidth}
        r={radius}
        cx={cx}
        cy={cy}
        strokeDasharray={[circumference, circumference]}
        strokeDashoffset={progress}
      />
      <Circle
        fill={'none'}
        stroke={'rgba(255, 255, 255, 0.25)'}
        strokeWidth={strokeWidth}
        r={radius}
        cx={cx}
        cy={cy}
      />
    </Svg>
  );
};

export default CircularTimerComponent;
