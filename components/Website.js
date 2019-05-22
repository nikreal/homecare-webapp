import React from 'react';
import {connect} from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity, BackHandler, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from './Settings';
import WebViewCleaner from "react-native-webview-cleaner";
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

class Website extends React.Component {
  webview = null;
  canGoBack = false;
  state = {    
    openSidebar: false,
    url: '',
    key: 1,
    hideSettings: false,
  }
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  // Save a url of Redux store to local state.
  componentDidMount() {
    this.setState({
      hideSettings: this.props.hideSettings,
      url: this.props.url
    });
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if (this.canGoBack) {
      this.webview.goBack();
    }
    else {      
      BackHandler.exitApp();
    }
    return true;
  }

  // When click settings icon.
  handleSettings = () => {
    this.setState({openSidebar: !this.state.openSidebar});
  }

  // When click 'Set Page' button.
  changeWebsite = (data) => {
    this.setState({
      url: data.url,
      hideSettings: data.hideSettings,
      openSidebar: false,
    });
  }

  // When click 'REFRESH' button.
  handleRefresh = () => {
    WebViewCleaner.clearAll();
    this.setState({
      openSidebar: false,
      key: this.state.key + 1
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          key={this.state.key}
          ref={ref => (this.webview = ref)} 
          useWebKit={true}
          originWhitelist={['*']}
          cacheEnabled={false}
          startInLoadingState={true}
          source={{uri: this.state.url}}
          onNavigationStateChange={navState => {
            this.canGoBack = navState.canGoBack;
          }} />
        
        {/* Top bar */}
        {
          this.state.hideSettings ? (
            <View></View>
          ) : [
            this.state.openSidebar ? (
              <View key={1} style={styles.topbar}>
                <View style={styles.sidebar}>
                  <Settings 
                    reset={true}
                    hideSettings={this.state.hideSettings}
                    navigation={this.props.navigation}
                    onPress={this.changeWebsite.bind(this)}
                    onRefresh={this.handleRefresh.bind(this)}
                  />
                </View>
                <View style={styles.triangle}>
                  <TouchableOpacity style={styles.settings} activeOpacity={0.8} onPress={this.handleSettings}>
                    <Icon  name="cog" size={20} color="#ddd"/>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View key={2} style={styles.topbar}>
                <View style={styles.triangle}>
                  <TouchableOpacity style={styles.settings} activeOpacity={0.8} onPress={this.handleSettings}>
                    <Icon  name="cog" size={20} color="#ddd"/>
                  </TouchableOpacity>
                </View>
              </View>
            )
          ]
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  sidebar: {
    width: 200,
    height: height
  },
  topbar: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row'
  },
  settings: {
    position: 'absolute',
    top: -80,
    left: 0,
    zIndex: 25,
    padding: 13
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 80,
    borderRightWidth: 80,
    borderColor: 'transparent',
    borderTopColor: '#787878',
    zIndex: 5,
    opacity: 0.8
  },
  webview: {
    alignSelf: 'stretch',
    position: 'absolute',
    backgroundColor: 'green',
    flex: 1
  }
});

const mapStateToProps = state => ({
  url: state.user.url,
  hideSettings: state.user.hideSettings,
});

export default connect(
  mapStateToProps
)(Website);