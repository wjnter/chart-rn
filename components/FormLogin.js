// import React from "react";
// import { AsyncStorage, Button, Text, TextInput, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { CONSTANT_TYPE } from "./utils/index";
// import { AuthContext, DataContext } from "../context";

// function SplashScreen() {
// 	return (
// 		<View>
// 			<Text>Loading...</Text>
// 		</View>
// 	);
// }

// const Stack = createStackNavigator();

// const initData = {
// 	gas: 0,
// 	temperature: 0,
// };

// export default function App({ navigation }) {
// 	const [websocket, setWebsocket] = useState(null);
// 	const [category, setCategory] = useState("");
// 	const [data, setData] = useState(initData);

// 	const [state, dispatch] = React.useReducer(
// 		(prevState, action) => {
// 			switch (action.type) {
// 				case "RESTORE_TOKEN":
// 					return {
// 						...prevState,
// 						userToken: action.token,
// 						isLoading: false,
// 					};
// 				case "SIGN_IN":
// 					return {
// 						...prevState,
// 						isSignout: false,
// 						userToken: action.token,
// 					};
// 				case "SIGN_OUT":
// 					return {
// 						...prevState,
// 						isSignout: true,
// 						userToken: null,
// 					};
// 			}
// 		},
// 		{
// 			isLoading: true,
// 			isSignout: false,
// 			userToken: null,
// 		}
// 	);

// 	React.useEffect(() => {
// 		// Fetch the token from storage then navigate to our appropriate place
// 		const bootstrapAsync = async () => {
// 			let userToken;

// 			try {
// 				userToken = await AsyncStorage.getItem("userToken");
// 			} catch (e) {
// 				// Restoring token failed
// 			}

// 			// After restoring token, we may need to validate it in production apps

// 			// This will switch to the App screen or Auth screen and this loading
// 			// screen will be unmounted and thrown away.
// 			dispatch({ type: "RESTORE_TOKEN", token: userToken });
// 		};

// 		bootstrapAsync();
// 	}, []);

// 	const authContext = React.useMemo(
// 		() => ({
// 			signIn: async (data) => {
// 				// In a production app, we need to send some data (usually username, password) to server and get a token
// 				// We will also need to handle errors if sign in failed
// 				// After getting token, we need to persist the token using `AsyncStorage`
// 				// In the example, we'll use a dummy token

// 				dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
// 			},
// 			signOut: () => dispatch({ type: "SIGN_OUT" }),
// 			signUp: async (data) => {
// 				// In a production app, we need to send user data to server and get a token
// 				// We will also need to handle errors if sign up failed
// 				// After getting token, we need to persist the token using `AsyncStorage`
// 				// In the example, we'll use a dummy token

// 				dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
// 			},
// 		}),
// 		[]
// 	);

// 	const connect = () => {
// 		const ws = new WebSocket("ws://localhost:3300");
// 		// var ws = new WebSocket("ws://ute-endgame.herokuapp.com");
// 		let that = this; // cache the this
// 		var connectInterval;

// 		// websocket onopen event listener
// 		ws.onopen = () => {
// 			console.log("connected websocket main component");

// 			setWebsocket(ws);

// 			that.timeout = 250; // reset timer to 250 on open of websocket connection
// 			clearTimeout(connectInterval); // clear Interval on on open of websocket connection
// 		};

// 		// websocket onclose event listener
// 		ws.onclose = (e) => {
// 			console.log(
// 				`Socket is closed. Reconnect will be attempted in ${Math.min(
// 					10000 / 1000,
// 					(that.timeout + that.timeout) / 1000
// 				)} second.`,
// 				e.reason
// 			);

// 			that.timeout = that.timeout + that.timeout; //increment retry interval
// 			connectInterval = setTimeout(check, Math.min(10000, that.timeout)); //call check function after timeout
// 		};

// 		ws.onmessage = (evt) => {
// 			handleUpdateData(evt.data);
// 		};

// 		// websocket onerror event listener
// 		ws.onerror = (err) => {
// 			console.error(
// 				"Socket encountered error: ",
// 				err.message,
// 				"Closing socket"
// 			);

// 			ws.close();
// 		};
// 	};
// 	const check = () => {
// 		if (!websocket || websocket.readyState === WebSocket.CLOSED) connect(); //check if websocket instance is closed, if so call `connect` function.
// 	};
// 	const handleUpdateData = (message) => {
// 		const data = JSON.parse(message);
// 		data &&
// 			data.map(({ type, time, value }) => {
// 				CONSTANT_TYPE.map(
// 					(item) =>
// 						item === type &&
// 						handleSetState({ type, data: value, category: time })
// 				);
// 				return true;
// 			});
// 	};
// 	const handleSetState = ({ type, data, category }) => {
// 		const newData = {
// 			...data,
// 			[type]: data,
// 		};
// 		setCategory(category);
// 		setData(newData);
// 	};

// 	useEffect(() => connect());

// 	return (
// 		<AuthContext.Provider value={authContext}>
// 			<NavigationContainer>
// 				<Stack.Navigator>
// 					{state.isLoading ? (
// 						// We haven't finished checking for the token yet
// 						<Stack.Screen name="Splash" component={SplashScreen} />
// 					) : state.userToken == null ? (
// 						// No token found, user isn't signed in
// 						<Stack.Screen
// 							name="SignIn"
// 							component={SignInScreen}
// 							options={{
// 								title: "Sign in",
// 								// When logging out, a pop animation feels intuitive
// 								animationTypeForReplace: state.isSignout ? "pop" : "push",
// 							}}
// 						/>
// 					) : (
// 						// User is signed in
// 						<Stack.Screen name="Home" component={HomeScreen} />
// 					)}
// 				</Stack.Navigator>
// 			</NavigationContainer>
// 		</AuthContext.Provider>
// 	);
// }
