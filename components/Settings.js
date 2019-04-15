import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {setPassword, setWebsite} from '../action';

class Settings extends Component {
  state = {    
    password: '',
    url: '',
    validPassword: true,
    validUrl: true,
  }
  componentDidMount() {
    this.setState({
      password: this.props.password,
      url: this.props.url,
    })
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
    if (!this.state.password || this.state.password == '') {
      // password none
      this.setState({validPassword: false});
    } else {
      this.setState({validPassword: true});      
    }
    if (!this.validateUrl(this.state.url)) {
      // not a valid url
      this.setState({validUrl: false});
    } else {
      // valid url
      this.setState({validUrl: true});      
    }
    if (this.state.validPassword && this.state.validUrl) {
      this.props.setPassword(this.state.password);
      this.props.setWebsite(this.state.url);
    }
  }
  refresh = () => {
    this.setState({
      password: '',
      url: ''
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style = {styles.button}
          onPress = {this.refresh}>
          <Text style = {styles.buttonText}>REFERESH</Text>
        </TouchableOpacity>
        <TextInput 
          style = {this.state.validPassword ? styles.input : {...styles.input, ...invalid}}
          underlineColorAndroid = "transparent"
          placeholder = "password"
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
  margin: 15,
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