import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    let timeStart = new Date().getTime();
    let timeEnd = null;
    let start = 0;
    let array = [0,1];
    let highestN = 1;
    super(props);
    this.state = {
      fib: 0,
      time: 0
    };

    function fib (n){
      if(n === 0){
        return 0;
      }
      if(!array[n]){
        for(var i = highestN + 1; i <= n; i++){
          array[i] = array[i-1] + array[i-2];
        }
        highestN = n;
      }
      return array[n];
    }

    function runForever(){
     var result = fib(start);
     this.setState({fib: result});
     start++;
      if(result !== Infinity){
         setTimeout(runForever,2);
      } else {
        timeEnd = new Date().getTime();
        this.setState({time: timeEnd - timeStart});
      }
    }
    runForever = runForever.bind(this);
    runForever();
    this.reset = () => {
      this.setState({
        fib: 0,
        time: 0
      });
      timeStart = new Date().getTime();
      timeEnd = null;
      start = 0;
      array = [0,1];
      highestN = 1;
      runForever();
    }
    this.reset = this.reset.bind(this);
    //wer

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>current Fibonacci: {this.state.fib} </Text>
        <Text>Total time: {this.state.time} </Text>
        <Button onPress={this.reset} title="reset"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
