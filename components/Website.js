import React from 'react';
import {connect} from "react-redux";
import { StyleSheet, WebView, View, Text, Image } from 'react-native';

class Website extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.topbar}>
            <Image style={styles.logo}
              source={require('../resources/images/logo.png')}
              resizeMode='contain'
            />
          </View>
        </View>
        <WebView style={styles.webview} useWebKit={true} source={{url: this.props.url}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbar: {
    height: 60,
    opacity: 0.8,
    backgroundColor: '#4D207F',
  },
  logo: {
    marginTop: 10,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: 1,
  },
  webview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  }
});

const mapStateToProps = state => ({
  url: state.user.url,
});

export default connect(
  mapStateToProps
)(Website);