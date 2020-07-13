import React, { useContext } from "react";import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
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
		return (
      <View style={styles.container}>
        <View style={styles.box}>
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

          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => signIn({ username, password })}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
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
  box: {
    width: 330,
    borderWidth: 1,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: "#fff",
    backgroundColor: "#F5FCFF"
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
    width:50,
    height:50,
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
    backgroundColor: "#ffa726",
  },
  loginText: {
    color: 'white',
    fontSize: 15,
    fontWeight: "600"
  }
});
