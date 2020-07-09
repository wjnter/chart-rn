import React, { useContext } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import { DataContext } from "../context";

const Status = () => {
	const { data } = useContext(DataContext);
	const good = "#76ff03";
	const danger = "#d50000";
	const statusStyles = {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: data[0].timbersaw ? good : danger,
	};
	const onAlert = () =>
		Alert.alert(
			"Timbersaw Status",
			data[0].timbersaw
				? "Everything is okay"
				: "I'm hearing sound of the timbersaw",
			[{ text: "OK" }, { text: "Cancel", style: "cancel" }],
			{ cancelable: true }
		);

	return (
		<TouchableOpacity onPress={onAlert}>
			<View style={statusStyles}></View>
		</TouchableOpacity>
	);
};

export default Status;
