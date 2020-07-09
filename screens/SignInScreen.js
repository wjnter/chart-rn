import React, { useContext } from "react";import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { AuthContext } from "../context";
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';

const SignInScreen = () => {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

	const { signIn } = React.useContext(AuthContext);
		// return (
			// <View style={styles.container}>
			// <Text style={styles.inputext}>Sample Login Form</Text>
			// 	<TextInput
			// 		placeholder="Username"
			// 		value={username}
			// 		onChangeText={setUsername}
			// 		style={styles.input}
			// 	/>
			// 	<TextInput
			// 		placeholder="Password"
			// 		value={password}
			// 		onChangeText={setPassword}
			// 		secureTextEntry
			// 		style={styles.input}
			// 	/>

				
			// 	<Button title="Sign in" onPress={() => signIn({ username, password })} 
			// 		style={styles.input} />
				
			// </View>
		// );
		return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={usernameImg}/>
          <TextInput style={styles.inputs}
              placeholder="Username"
							value={username}
							onChangeText={setUsername}
              underlineColorAndroid='transparent'/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={passwordImg}/>
          <TextInput style={styles.inputs}
						placeholder="Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => signIn({ username, password })}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
