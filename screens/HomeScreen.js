import React, { useContext } from "react";
import Chart from "../components/Chart";
import {
	AsyncStorage,
	Button,
	Text,
	TextInput,
	View,
	ScrollView,
} from "react-native";
import { AuthContext, DataContext } from "../context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Node1 = () => {
	const { signOut } = useContext(AuthContext);
	const { data, category, avgData, websocket } = useContext(DataContext);

	const sendData = () => {
		try {
			websocket.send("getAvgData"); //send data to the server
		} catch (error) {
			console.log(error); // catch error
		}
	};

	console.log("category homscreen:  ", avgData.category);
	return (
		<View>
			<Text>Signed in!</Text>
			<Button title="Sign out" onPress={signOut} />
			<Button title="Get Average Data" onPress={sendData} />
			<ScrollView>
				<Chart labels={category} data={data[0].gas} daily={true} />
				<Chart labels={category} data={data[0].temperature} daily={true} />
				<Chart
					labels={avgData.category}
					data={avgData.data[0].avgTemperature}
					daily={false}
				/>
			</ScrollView>
		</View>
	);
};

const HomeScreen = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator>
			<Tab.Screen name="Node 1" component={Node1} />
			<Tab.Screen name="Node 2" component={Node1} />
		</Tab.Navigator>
	);
};

export default HomeScreen;
