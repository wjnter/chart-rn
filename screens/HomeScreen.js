import React, { useContext } from "react";
import Chart from "../components/Chart";
import { AsyncStorage, Button, Text, TextInput, View } from "react-native";
import { AuthContext, DataContext } from "../context";

const HomeScreen = () => {
	const { signOut } = useContext(AuthContext);
	const { data, category } = useContext(DataContext);

	return (
		<View>
			<Text>Signed in!</Text>
			<Chart labels={category} data={data[0].gas} />
			<Chart labels={category} data={data[0].temperature} />
			<Button title="Sign out" onPress={signOut} />
		</View>
	);
};

export default HomeScreen;
