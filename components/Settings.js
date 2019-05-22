import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import { NavigationActions, StackActions } from "react-navigation";
import CheckBox from 'react-native-check-box'
import {connect} from 'react-redux';
import {setHideSettings, setPassword, setWebsite} from '../action';

class Settings extends Component {
  state = {    
    password: '',
    url: this.props.url,
    validPassword: true,
    validUrl: true,
    reset: false,
    isChecked: false,
  }
  componentDidMount() {
    AsyncStorage.getItem("url").then((value) => {
      if (!value) value = this.props.url;
      this.setState({
        url: value
      });
    }).catch(() => {
      this.setState({
        url: this.props.url,
      })
    });
    if (this.props && this.props.reset) {
      this.setState({reset: true});
    }
    this.setState({ischecked: this.props.hideSettings});
  }
  // Validation url format
  validateUrl = (url) => {
    var re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return re.test(url);
  };

  handlePassword = (text) => {
    this.setState({password: text})
  }
  handleUrl = (text) => {
    this.setState({url: text})    
  }

  // change google.com to https://google.com
  makeFullUrl = (url) => {
    var re = /^(?:http(s)?:\/\/)/;
    if(re.test(url)) return url;
    else {
      console.log('https://'+url);
      return 'https://'+url;
    }
  }

  setPage = () => {
    
    if (
      // Check existing password and validation of url when reset website  
      (this.state.reset && this.state.password === this.props.password) || 
      // When app starts, validation of password and url
      (!this.state.reset && this.state.password)
    ) {
      // Save password and url in Redux store.      
      this.props.setHideSettings(this.state.isChecked);
      this.props.setPassword(this.state.password);
      this.props.setWebsite(this.makeFullUrl(this.state.url));
      AsyncStorage.setItem('url', this.state.url);
      // Set validatioin to true.
      this.setState({
        validPassword: true,
        validateUrl: true,
      });
      
      // When reset the url by click settings button on webview page, reset the webpage with new url.
      if (this.state.reset) { 
        this.props.onPress({url: this.makeFullUrl(this.state.url), hideSettings: this.state.isChecked});
      } else { 
        // When the app starts, navigate to webview page.
        // this.props.navigation.navigate('Website', 0);
        // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Website' })], 0)
        var navActions = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Website" })]
        });
        this.props.navigation.dispatch(navActions);
      }
      return;
    }

    // Confirm existing password on Settings page after app is running.
    if (this.state.reset) {
      this.setState({validPassword: this.state.password === this.props.password});
    }
    else {
      // Check if password is inputed when app starts at the first time.
      this.setState({validPassword: !(!this.state.password)});
    }
    
    // Check url validation status
    this.setState({validUrl: this.validateUrl(this.state.url)});   
    
  }
  refresh = () => {
    this.props.onRefresh();    
  }

  render() {
    return (
      <View style={styles.container}>
        {
          // when click the settings button, it shows REFRESH BUTTON
          this.state.reset ? (
            <TouchableOpacity
              style = {styles.button}
              onPress = {this.refresh}>
              <Text style = {styles.buttonText}>REFERESH</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )  
        }
        <View style={{width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
          <CheckBox
            checkBoxColor='#000'
            onClick={()=>{
              this.setState({
                  isChecked:!this.state.isChecked
              })
            }}
            isChecked={this.state.isChecked}
          />
          <Text> Hide Settings</Text>
        </View>
        
        <TextInput 
          style = {this.state.validPassword ? styles.input : {...styles.input, ...invalid}}
          underlineColorAndroid = "transparent"
          placeholder = "password"
          secureTextEntry={this.state.reset}
          placeholderTextColor = "grey"
          autoCapitalize = "none"
          value = {this.state.password}
          onChangeText = {this.handlePassword}/>
        <TextInput 
          style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "website url"
          placeholderTextColor = "grey"
          autoCapitalize = "none"
          value = {this.state.url}
          onChangeText = {this.handleUrl}/>
        <TouchableOpacity
          style = {styles.button}
          onPress = {this.setPage}>
          <Text style = {styles.buttonText}>SET PAGE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const commonStyle = {
  width: '80%',
  margin: 10,
  height: 40,
  borderRadius: 5,
  textAlign: 'center'
};
const invalid = {
  borderBottomColor: 'red',
  borderBottomWidth: 1,  
  borderStyle: 'solid',
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#787878',
    opacity: 0.8
  },
  input: {
    ...commonStyle,
    backgroundColor: 'white',
  },
  button: {
    ...commonStyle,
    backgroundColor: '#9c28b1',
    padding: 11,
  },
  buttonText:{
    color: 'white',
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  hideSettings: state.user.hideSettings,
  password: state.user.password,
  url: state.user.url,
});

const mapDispatchToProps = dispatch => ({
  setHideSettings: ischecked => dispatch(setHideSettings(ischecked)),
  setPassword: password => dispatch(setPassword(password)),
  setWebsite: url => dispatch(setWebsite(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);