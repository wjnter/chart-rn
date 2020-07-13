import React, { useState, useEffect } from "react";
import { AsyncStorage, Button, Text, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
	CONSTANT_TYPE,
	handleSetState,
	CONSTANT_TYPE_AVG,
	updateAvgData,
} from "./utils";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import { AuthContext, DataContext } from "./context";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Notification from "./components/Notification";

function SplashScreen() {
	return (
		<View style={styles.container}>
			<Text>Loading...</Text>
		</View>
	);
}

const Stack = createStackNavigator();

const initData = [
	{ id: "Node1", gas: "", temperature: "", battery: "", timbersaw: false },
	{ id: "Node2", gas: "", temperature: "", battery: "", timbersaw: false },
];
const initAvgData = {
	category: [],
	data: [
		{ id: "Node1", avgTemperature: [""], avgGas: [""] },
		{ id: "Node2", avgTemperature: [""], avgGas: [""] },
	],
};

export default function App() {
	const [websocket, setWebsocket] = useState(null);
	const [category, setCategory] = useState("");
	const [data, setData] = useState(initData);
	const [avgData, setAvgData] = useState(initAvgData);
	const [visible, setVisible] = useState(false);

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
				connect();
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
		let timeout = 0;

		// websocket onopen event listener
		ws.onopen = () => {
			console.log("connected websocket main component");

			setWebsocket(ws);

			// timeout = 250; // reset timer to 250 on open of websocket connection
			// clearTimeout(connectInterval); // clear Interval on on open of websocket connection
		};

		// websocket onclose event listener
		ws.onclose = (e) => {
			// console.log(
			// 	`Socket is closed. Reconnect will be attempted in ${Math.min(
			// 		10000 / 1000,
			// 		(timeout + timeout) / 1000
			// 	)} second.`,
			// 	e.reason
			// );

			// timeout = timeout + timeout; //increment retry interval
			// connectInterval = setTimeout(check, Math.min(10000, timeout)); //call check function after timeout
			console.log("try again. cannot connect to ws");
			setVisible(!visible);
		};

		ws.onmessage = (evt) => {
			handleUpdateData(evt.data);
		};

		// websocket onerror event listener
		ws.onerror = (err) => {
			// console.error(
			// 	"Socket encountered error: ",
			// 	err.message,
			// 	"Closing socket"
			// );
			// console.log("error connection: ", err);
			// console.log("---- err");
			ws.close();
		};
	};
	const check = () => {
		if (!websocket || websocket.readyState === WebSocket.CLOSED) connect(); //check if websocket instance is closed, if so call `connect` function.
	};

	const getPushNotificationPermissions = async () => {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;

		// only ask if permissions have not already been determined, because
		// iOS won't necessarily prompt the user a second time.
		if (existingStatus !== "granted") {
			// Android remote notification permissions are granted during the app
			// install, so this will only ask on iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
		if (!Constants.isDevice) {
			console.log("Must use physical device for Push Notifications");
		}

		// Stop here if the user did not grant permissions
		if (finalStatus !== "granted") {
			return;
		}
		console.log(finalStatus);

		// Get the token that uniquely identifies this device
		console.log(
			"Notification Token: ",
			await Notifications.getExpoPushTokenAsync()
		);
	};

	const handleUpdateData = (message) => {
		let newData = [...data];
		let category = "";
		let newAvgData = [
			{
				id: "Node1",
				avgTemperature: [],
				avgGas: [],
			},
			{
				id: "Node2",
				avgTemperature: [],
				avgGas: [],
			},
		];
		let newAvgCategory = [];
		const dataMessage = JSON.parse(message);
		if (dataMessage[0] !== null) {
			if (dataMessage[0] !== "getAvgData") {
				for (let dataInMessage of dataMessage) {
					const { type, time, valueNode1, valueNode2 } = dataInMessage;
					[newData, category] = updateAvgData({
						type,
						time,
						valueNode1,
						valueNode2,
						newData,
					});
				}
				setCategory(category);
				setData(newData);
			} else {
				dataMessage[1].map((dataItem) => {
					newAvgCategory.length < dataMessage[1].length / 2 &&
						newAvgCategory.push(dataItem.date);
					newAvgData.map((newAvgDataItem) => {
						CONSTANT_TYPE_AVG.map((typeItem) => {
							if (typeItem === dataItem.type.toLowerCase()) {
								const keyOfValue = `value${newAvgDataItem.id}`; // -> valueNode1 or valueNode2
								newAvgDataItem[dataItem.type].push(dataItem[keyOfValue]);
							}
							return true;
						});
						return true;
					});
					return true;
				});
				setAvgData({ category: newAvgCategory, data: newAvgData });
			}
		}
	};

	
	const getVisible = (visibleProps) => setVisible(!visibleProps);

	useEffect(() => dispatch({ type: "SIGN_IN", token: "dummy-auth-token" }), [
		websocket,
	]);
	// useEffect(() => {
	// 	getPushNotificationPermissions();
	// });

	return (
		<>
			<Notification
				visible={visible}
				title={"Error Connection"}
				body={"Cannot connect to server. Please try again!"}
				getVisible={getVisible}
			/>
			<AuthContext.Provider value={authContext}>
				<DataContext.Provider value={{ data, category, avgData, websocket }}>
					<NavigationContainer>
						<Stack.Navigator>
							{state.isLoading ? (
								// We haven't finished checking for the token yet
								<Stack.Screen name="Splash" component={SplashScreen} />
							) : state.userToken == null ? (
								<Stack.Screen
									name="SignIn"
									component={SignInScreen}
									options={{
										title: "Login to End Game UTE",
										// When logging out, a pop animation feels intuitive
										animationTypeForReplace: state.isSignout ? "pop" : "push",
									}}
								/>
							) : (
								// User is signed in
								<Stack.Screen
									name="Home"
									component={HomeScreen}
									options={{
										headerRight: () => (
											<Button
												onPress={() => authContext.signOut()}
												title="Info"
												color="#000"
											/>
										),
									}}
								/>
							)}
						</Stack.Navigator>
					</NavigationContainer>
				</DataContext.Provider>
			</AuthContext.Provider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
