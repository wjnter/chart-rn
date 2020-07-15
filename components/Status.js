import React, { useContext, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { DataContext } from "../context";
import Notification from "./Notification";

const Status = () => {
	const { data } = useContext(DataContext);
	const [visible, setVisible] = useState(false);
	const good = "#76ff03";
	const danger = "#d50000";
	const statusStyles = {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: data[0].timbersaw ? good : danger,
	};
	const getVisible = (visibleProps) => setVisible(!visibleProps);
	const body = data[0].timbersaw
		? "I'm hearing sound of saw machine"
		: "Safe forest!!";
	return (
		<View>
			<Notification
				visible={visible}
				title={"Status of Forest"}
				body={body}
				getVisible={getVisible}
			/>
			<TouchableOpacity onPress={() => setVisible(!visible)}>
				<View style={statusStyles}></View>
			</TouchableOpacity>
		</View>
	);
};

export default Status;
