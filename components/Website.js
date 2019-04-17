import React from 'react';
import {connect} from "react-redux";
import { StyleSheet, View, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from './Settings';


class Website extends React.Component {
  state = {    
    openSidebar: false,
  }
  handleSettings = () => {
    this.setState({openSidebar: !this.state.openSidebar});
    console.log(this.state.openSidebar);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{...styles.topbar, backgroundColor: '#4D207F', zIndex: 20, opacity: 0.8}} />
        <View style={{...styles.topbar, zIndex: 25}}>
          {
            this.state.openSidebar ? (<View style={{flex: 1}}/>) : (<View/>)
          }          
          <View style={{flex: 2}}>
            <Image style={styles.logo}
              source={require('../resources/images/Icon.png')}
              resizeMode='contain'
            />
            <Icon style={styles.settings} name="cog" size={20} color="#ddd" onPress={this.handleSettings}/>
          </View>
        </View>
        
        <View style={styles.container2}>
          {
            this.state.openSidebar ? (
              <View style={styles.sidebar}>
                <Settings reset={true} navigation={this.props.navigation}/>
              </View>
            ) : (
              <Text/>
            )
          }
          <View style={styles.main}>
            <View style={styles.triangle}/>
            <WebView 
              style={styles.webview}
              useWebKit={true}
              originWhitelist={['*']}
              cacheEnabled={false}
              source={{uri: this.props.url}} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    paddingTop: 60, 
    backgroundColor: '#787878'
  },
  main: {
    flex: 2
  },
  topbar: {
    height: 60,
    width: '100%',
    position: 'absolute',
    top: 0,
    flex: 1,
    flexDirection: 'row',
  },
  settings: {
    position: 'absolute',
    top: 15,
    left: 15
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 80,
    borderRightWidth: 80,
    borderColor: 'transparent',
    borderTopColor: '#787878',
    position: 'absolute',
    top: 0,
    zIndex: 2
  },
  logo: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 40,
    opacity: 1,
  },
  webview: {
    marginTop: 60,
  }
});

const mapStateToProps = state => ({
  url: state.user.url,
});

export default connect(
  mapStateToProps
)(Website);