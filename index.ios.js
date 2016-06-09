import React, { Component } from 'react';
import formatTime from 'minutes-seconds-milliseconds';

import {
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet
} from 'react-native';

class ReactNativeStopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: 0,
      startTime: 0,
      isRunning: false,
      laps: []
    }
  }
  render() {
    return (<View style={styles.container}>
        <View style={[styles.header, this.border('yellow')]}>{/* Yellow -- check array of styles !  */}
          <View style={[styles.timerWrapper, this.border('red')]}>{/* Red*/}
            <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={[styles.buttonWrapper, this.border('green')]}>{/* Green */}
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <View style={[styles.footer, this.border('blue')]}>{/* Blue */}
          {this.laps()}
        </View>
      </View>);
  }
  laps() {
    return this.state.laps.map((lapTime, index) => {
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(lapTime)}
        </Text>
      </View>
    });
  }
  startStopButton() {

    var buttonStyle = this.state.isRunning ? styles.stopButton : styles.startButton;

    return (<TouchableHighlight underlayColor='gray' onPress={this.handleStartPress.bind(this)} style={[styles.button, buttonStyle]}>
          <Text>
            {this.state.isRunning ? 'Stop' : 'Start'}
          </Text>
        </TouchableHighlight>);
  }
  lapButton() {
    return (
        <TouchableHighlight underlayColor='gray' onPress={this.handleLapPress.bind(this)} style={styles.button}>
          <Text>
            Lap
          </Text>
        </TouchableHighlight>
        );
  }
  border(color) {
    return {
      //borderColor: color,
      //borderWidth: 4
    }
  }
  handleStartPress() {
    if (this.state.isRunning) {
      clearInterval(this.interval);
      this.setState({isRunning:false});
      return;
    }
    this.setState({startTime: new Date()});
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        isRunning: true
      });
    }, 30);
  }
  handleLapPress() {
     var lapTime = this.state.timeElapsed;
     // concat returns a new array. Push changes array.
     this.setState({
       startTime: new Date(),
       laps: this.state.laps.concat([lapTime])
     });

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    alignItems: 'stretch'
  },
  header: { // Yellow
    flex: 1
  },
  footer: { // Blue
    flex: 1
  },
  timerWrapper: { // Red
    flex: 5, // take 5/8th of the space 
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: { // Green
    flex: 3, // take 3/8th of the space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60,
    fontFamily: 'CourierNewPSMT'
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'    
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('ReactNativeStopwatch', () => ReactNativeStopwatch);
