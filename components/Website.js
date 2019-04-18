import React from 'react';
import {connect} from "react-redux";
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from './Settings';
import WebViewCleaner from "react-native-webview-cleaner";


class Website extends React.Component {
  webview = null;
  state = {    
    openSidebar: false,
    url: ''
  }
  // Save a url of Redux store to local state.
  componentDidMount() {
    this.setState({url: this.props.url})
  }

  // When click settings icon.
  handleSettings = () => {
    this.setState({openSidebar: !this.state.openSidebar});
    console.log(this.state.openSidebar);
  }

  // When click 'Set Page' button.
  changeWebsite = (url) => {
    this.setState({url: url});
    this.setState({openSidebar: false});
  }

  // When click 'REFRESH' button.
  handleRefresh = () => {
    WebViewCleaner.clearAll();
    this.webview.reload();
    this.setState({openSidebar: false});
  }

  render() {
    return (
      <View style={styles.container}>

        {/* Top bar */}
        <View style={styles.topbar}>
          {
            this.state.openSidebar ? (<View style={{width: 200}}/>) : (<View/>)
          }          
          <View style={styles.main}>
            <Icon style={styles.settings} name="cog" size={20} color="#ddd" onPress={this.handleSettings}/>
          </View>
        </View>
        
        {/* Main Container with sidebar and main page */}
        <View style={styles.container2}>

          {/* Sidebar */}
          {
            this.state.openSidebar ? (
              <View style={styles.sidebar}>
                <Settings reset={true} navigation={this.props.navigation} onPress={this.changeWebsite.bind(this)} onRefresh={this.handleRefresh.bind(this)}/>
              </View>
            ) : (
              <Text/>
            )
          }

          {/* Main Webview Page */}
          <View style={styles.main}>
            <View style={styles.triangle}/>
            <WebView
              ref={ref => (this.webview = ref)} 
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