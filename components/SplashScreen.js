import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../resources/images/mark.png')}
          style={styles.logoStyle}
          resizeMode='contain'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoStyle: {
    width: '80%',
  },
});