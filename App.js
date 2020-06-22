import React, { useState, useEffect } from "react";
import { AsyncStorage, Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CONSTANT_TYPE, handleSetState } from "./utils";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import { AuthContext, DataContext } from "./context";

function SplashScreen() {
	return (
		<View>
			<Text>Loading...</Text>
		</View>
	);
}

const Stack = createStackNavigator();

const initData = [
	{ id: "Node1", gas: 0, temperature: 0 },
	{ id: "Node2", gas: 0, temperature: 0 },
];

export default function App({ navigation }) {
	const [websocket, setWebsocket] = useState(null);
	const [category, setCategory] = useState("");
	const [data, setData] = useState(initData);

	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "RESTORE_TOKEN":
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case "SIGN_IN":
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case "SIGN_OUT":
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		}
	);

	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let userToken;

			try {
				userToken = await AsyncStorage.getItem("userToken");
			} catch (e) {
				// Restoring token failed
			}

			// After restoring token, we may need to validate it in production apps

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			dispatch({ type: "RESTORE_TOKEN", token: userToken });
		};

		bootstrapAsync();
	}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async (data) => {
				// In a production app, we need to send some data (usually username, password) to server and get a token
				// We will also need to handle errors if sign in failed
				// After getting token, we need to persist the token using `AsyncStorage`
				// In the example, we'll use a dummy token

				dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
			},
			signOut: () => dispatch({ type: "SIGN_OUT" }),
			signUp: async (data) => {
				// In a production app, we need to send user data to server and get a token
				// We will also need to handle errors if sign up failed
				// After getting token, we need to persist the token using `AsyncStorage`
				// In the example, we'll use a dummy token

				dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
			},
		}),
		[]
	);
	// const url = "ws://45.119.83.71:3300/";
	const url = "ws://localhost:3300";
	const connect = () => {
		const ws = new WebSocket(url);
		var connectInterval;

		// websocket onopen event listener
		ws.onopen = () => {
			console.log("connected websocket main component");

			setWebsocket(ws);

			timeout = 250; // reset timer to 250 on open of websocket connection
			clearTimeout(connectInterval); // clear Interval on on open of websocket connection
		};

		// websocket onclose event listener
		ws.onclose = (e) => {
			console.log(
				`Socket is closed. Reconnect will be attempted in ${Math.min(
					10000 / 1000,
					(timeout + timeout) / 1000
				)} second.`,
				e.reason
			);

			timeout = timeout + timeout; //increment retry interval
			connectInterval = setTimeout(check, Math.min(10000, timeout)); //call check function after timeout
		};

		ws.onmessage = (evt) => {
			handleUpdateData(evt.data);
		};

		// websocket onerror event listener
		ws.onerror = (err) => {
			console.error(
				"Socket encountered error: ",
				err.message,
				"Closing socket"
			);

			ws.close();
		};
	};
	const check = () => {
		if (!websocket || websocket.readyState === WebSocket.CLOSED) connect(); //check if websocket instance is closed, if so call `connect` function.
	};

	const handleUpdateData = (message) => {
		let newData = [...data];
		let category = "";
		const dataMessage = JSON.parse(message);
		dataMessage[0] !== null &&
			dataMessage.map(({ type, time, valueNode1, valueNode2 }) => {
				CONSTANT_TYPE.map((item) => {
					if (item === type) {
						[newData, category] = handleSetState({
							type,
							valueNode1,
							valueNode2,
							category: time,
							newData,
						});
					}
				});
				return true;
			});
		setCategory(category);
		setData(newData);
	};

	useEffect(() => connect(), []);

	return (
		<AuthContext.Provider value={authContext}>
			<DataContext.Provider value={{ data, category }}>
				<NavigationContainer>
					<Stack.Navigator>
						{state.isLoading ? (
							// We haven't finished checking for the token yet
							<Stack.Screen name="Splash" component={SplashScreen} />
						) : state.userToken == null ? (
							// No token found, user isn't signed in
							<Stack.Screen
								name="SignIn"
								component={SignInScreen}
								options={{
									title: "Sign in",
									// When logging out, a pop animation feels intuitive
									animationTypeForReplace: state.isSignout ? "pop" : "push",
								}}
							/>
						) : (
							// User is signed in
							<Stack.Screen name="Home" component={HomeScreen} />
						)}
					</Stack.Navigator>
				</NavigationContainer>
			</DataContext.Provider>
		</AuthContext.Provider>
	);
}
