import React, { useState, useContext } from "react";
import Chart from "../components/Chart";
import { AuthContext, DataContext } from "../context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	Switch,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Button,
} from "react-native";
import Constants from "expo-constants";
import Collapsible from "react-native-collapsible";

function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Settings!</Text>
		</View>
	);
}

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={TabScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
}

const initD = [10, 15, 10, 15, 10, 15, 10, 15, 10, 15];
const initL = [
	"11:32:11",
	"11:32:11",
	"11:32:11",
	"11:32:11",
	"11:32:11",
	"11:32:11",
	"11:32:11",
	"11:32:11",
	"11:32:11",
	"11:32:11",
];

const TabScreen = () => {
	const [collapsed, setCollapsed] = useState(true);
	const [labels, setLabels] = useState(initL);
	const [data, setData] = useState(initD);
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ paddingTop: 10 }}>
				<Text style={styles.title}>Accordion Example</Text>
				<Chart labels={labels} data={data} />
				<Chart labels={labels} data={data} />
				<TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
					<View style={styles.header}>
						<Text style={styles.headerText}>Single Collapsible</Text>
					</View>
				</TouchableOpacity>
				<Collapsible collapsed={collapsed} align="center">
					<Node1Screen />
				</Collapsible>
			</ScrollView>
		</View>
	);
};

const Node1Screen = () => {
	const { signOut } = useContext(AuthContext);
	// const { data, category } = useContext(DataContext);
	const [labels, setLabels] = useState(initL);
	const [data, setData] = useState(initD);
	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
			<Text>Signed in!</Text>
			<Button title="Sign out" onPress={signOut} />
			<ScrollView>
				<Chart labels={labels} data={data} />
				<Chart labels={labels} data={data} />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5FCFF",
		paddingTop: Constants.statusBarHeight,
	},
	title: {
		textAlign: "center",
		fontSize: 22,
		fontWeight: "300",
		marginBottom: 20,
	},
	header: {
		backgroundColor: "#F5FCFF",
		padding: 10,
	},
	headerText: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: "500",
	},
	content: {
		padding: 20,
		backgroundColor: "#fff",
	},
	active: {
		backgroundColor: "rgba(255,255,255,1)",
	},
	inactive: {
		backgroundColor: "rgba(245,252,255,1)",
	},
	selectors: {
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "center",
	},
	selector: {
		backgroundColor: "#F5FCFF",
		padding: 10,
	},
	activeSelector: {
		fontWeight: "bold",
	},
	selectTitle: {
		fontSize: 14,
		fontWeight: "500",
		padding: 10,
	},
	multipleToggle: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 30,
		alignItems: "center",
	},
	multipleToggle__title: {
		fontSize: 16,
		marginRight: 8,
	},
});

// import React, { useContext } from "react";
// import Chart from "../components/Chart";
// import {
// 	AsyncStorage,
// 	Button,
// 	Text,
// 	TextInput,
// 	View,
// 	ScrollView,
// } from "react-native";
// import { AuthContext, DataContext } from "../context";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const Node1 = () => {
// 	const { signOut } = useContext(AuthContext);
// 	const { data, category, avgData, websocket } = useContext(DataContext);

// 	const sendData = () => {
// 		try {
// 			websocket.send("getAvgData"); //send data to the server
// 		} catch (error) {
// 			console.log(error); // catch error
// 		}
// 	};

// 	console.log("category homscreen:  ", avgData.category);
// 	return (
// 		<View>
// 			<Text>Signed in!</Text>
// 			<Button title="Sign out" onPress={signOut} />
// 			<Button title="Get Average Data" onPress={sendData} />
// 			<ScrollView>
// 				<Chart labels={category} data={data[0].gas} daily={true} />
// 				<Chart labels={category} data={data[0].temperature} daily={true} />
// 				<Chart
// 					labels={avgData.category}
// 					data={avgData.data[0].avgTemperature}
// 					daily={false}
// 				/>
// 			</ScrollView>
// 		</View>
// 	);
// };

// const HomeScreen = () => {
// 	const Tab = createBottomTabNavigator();
// 	return (
// 		<Tab.Navigator>
// 			<Tab.Screen name="Node 1" component={Node1} />
// 			<Tab.Screen name="Node 2" component={Node1} />
// 		</Tab.Navigator>
// 	);
// };

// export default HomeScreen;
