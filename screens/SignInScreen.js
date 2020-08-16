import React, { useContext } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	Keyboard,
	TouchableWithoutFeedback,
	Dimensions,
} from "react-native";
import { AuthContext } from "../context";
import usernameImg from "../assets/images/username.png";
import passwordImg from "../assets/images/password.png";
import feee from "../assets/images/feee.png";

const windowWidth = Dimensions.get("window").width;
console.log(windowWidth);
const SignInScreen = () => {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const { signIn } = React.useContext(AuthContext);
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<Image resizeMode="contain" style={styles.logo} source={feee} />
				<View style={styles.box}>
					<View style={styles.inputContainer}>
						<Image style={styles.inputIcon} source={usernameImg} />
						<TextInput
							style={styles.inputs}
							placeholder="Tài khoản"
							value={username}
							onChangeText={setUsername}
							underlineColorAndroid="transparent"
						/>
					</View>

					<View style={styles.inputContainer}>
						<Image style={styles.inputIcon} source={passwordImg} />
						<TextInput
							style={styles.inputs}
							placeholder="Mật khẩu"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
						/>
					</View>

					<TouchableOpacity
						style={[styles.buttonContainer, styles.loginButton]}
						onPress={() => signIn({ username, password })}
					>
						<Text style={styles.loginText}>Đăng nhập</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.emptyTrick}></View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	box: {
		width: 330,
		borderWidth: 1,
		flex: 0.35,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		borderColor: "#fff",
		backgroundColor: "#Fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,

		elevation: 6,
	},
	logo: {
		width: windowWidth,
		height: 90,
		justifyContent: "center",
		flex: 0.25,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
	},
	inputContainer: {
		borderBottomColor: "#F5FCFF",
		backgroundColor: "#FFFFFF",
		borderRadius: 30,
		borderBottomWidth: 1,
		width: 250,
		height: 45,
		marginBottom: 15,
		flexDirection: "row",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	inputs: {
		height: 45,
		marginLeft: 16,
		borderBottomColor: "#FFFFFF",
		flex: 1,
	},
	inputIcon: {
		width: 50,
		height: 50,
		marginLeft: 15,
		justifyContent: "center",
	},
	buttonContainer: {
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
		width: 250,
		borderRadius: 30,
	},
	loginButton: {
		backgroundColor: "#ffa726",
	},
	loginText: {
		color: "white",
		fontSize: 15,
		fontWeight: "600",
	},
	emptyTrick: {
		flex: 0.1,
	},
});
