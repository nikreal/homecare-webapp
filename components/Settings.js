import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {setPassword, setWebsite} from '../action';
// import * as CacheManager from 'react-native-http-cache';

class Settings extends Component {
  state = {    
    password: '',
    url: '',
    validPassword: true,
    validUrl: true,
    reset: false,
  }
  componentDidMount() {
    this.setState({
      url: this.props.url,
    })
    if (this.props && this.props.reset) {
      this.setState({reset: true});
    }
  }
  validateUrl = (url) => {
    var re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      return re.test(url);
  };
  handlePassword = (text) => {
    this.setState({password: text})
  }
  handleUrl = (text) => {
    this.setState({url: text})    
  }
  setPage = () => {
    
    if (
      // Check existing password and validation of url when reset website  
      (this.state.reset && this.state.password === this.props.password && this.validateUrl(this.state.url)) || 
      // When app starts, validation of password and url
      (!this.state.reset && this.state.password && this.validateUrl(this.state.url))
    ) {
      this.props.setPassword(this.state.password);
      this.props.setWebsite(this.state.url);
      this.setState({
        validPassword: true,
        validateUrl: true,
      });
      this.props.navigation.navigate('Website');
      return;
    }
    if (this.state.reset) {
      this.setState({validPassword: this.state.password === this.props.password});
    }
    else {
      this.setState({validPassword: !(!this.state.password)});
    }    
    this.setState({validUrl: this.validateUrl(this.state.url)});   
    
  }
  refresh = () => {
    // CacheManager.clear(() => {
      this.props.navigation.navigate('Website');
    // })    
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
          style = {this.state.validUrl ? styles.input : {...styles.input, ...invalid}}
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
  password: state.user.password,
  url: state.user.url,
});

const mapDispatchToProps = dispatch => ({
  setPassword: password => dispatch(setPassword(password)),
  setWebsite: url => dispatch(setWebsite(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);