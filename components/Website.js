import React from 'react';
import {connect} from "react-redux";
import { StyleSheet, View, Text, Image, WebView } from 'react-native';
// import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from './Settings';


class Website extends React.Component {
  state = {    
    openSidebar: false,
    url: ''
  }
  componentDidMount() {
    this.setState({url: this.props.url})
  }
  handleSettings = () => {
    this.setState({openSidebar: !this.state.openSidebar});
    console.log(this.state.openSidebar);
  }
  changeWebsite = (url) => {
    this.setState({url: url});
    this.setState({openSidebar: false});
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          {
            this.state.openSidebar ? (<View style={{width: 200}}/>) : (<View/>)
          }          
          <View style={styles.main}>
            <Icon style={styles.settings} name="cog" size={20} color="#ddd" onPress={this.handleSettings}/>
          </View>
        </View>
        
        <View style={styles.container2}>
          {
            this.state.openSidebar ? (
              <View style={styles.sidebar}>
                <Settings reset={true} navigation={this.props.navigation} onPress={this.changeWebsite.bind(this)}/>
              </View>
            ) : (
              <Text/>
            )
          }
          <View style={styles.main}>
            <View style={styles.triangle}/>
            <WebView 
              useWebKit={true}
              originWhitelist={['*']}
              cacheEnabled={false}
              startInLoadingState={true}
              source={{uri: this.state.url}} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200
  },
  main: {
    flexGrow: 1
  },
  topbar: {
    height: 60,
    width: '100%',
    position: 'absolute',
    top: 0,
    flex: 1,
    flexDirection: 'row',
    zIndex: 25
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
    zIndex: 2,
    opacity: 0.8
  }
});

const mapStateToProps = state => ({
  url: state.user.url,
});

export default connect(
  mapStateToProps
)(Website);