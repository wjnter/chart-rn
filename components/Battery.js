import React, { useContext, useState, useEffect } from "react";
import { calculateTime } from "../utils";
import { DataContext } from "../context";
import Notification from "./Notification";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Battery = ({ data }) => {
	const [count, setCount] = useState(data || 0);
	const [visible, setVisible] = useState(false);
	const setProgress = () => ({
		position: "absolute",
		left: 0,
		top: 0,
		width: `${count}%`,
		height: "100%",
		backgroundColor: "#ffa726",
	});
	const getVisible = (visibleProps) => setVisible(!visibleProps);
	const timeLife = (count / 100) * 5;
	const body = `Pin còn hiệu lực trong ${calculateTime(timeLife)}.`;

	useEffect(() => setCount(data || 0), [data]);
	return (
		<>
			<Notification
				visible={visible}
				title={"Thời lượng pin"}
				body={body}
				getVisible={getVisible}
			/>
			<TouchableOpacity
				style={styles.battery}
				onPress={() => setVisible(!visible)}
			>
				<Text style={{ marginBottom: 7, fontWeight: "500" }}>Pin</Text>
				<View style={styles.box}>
					<View style={setProgress()}></View>
					<View style={{ flex: 1, alignSelf: "center", bottom: 0 }}>
						<Text style={{ flex: 1 }}>{count === 0 ? "" : count + "%"}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};
export default Battery;

const styles = StyleSheet.create({
	battery: {
		flex: 0.3,
		alignItems: "center",
		justifyContent: "space-between",
		height: 60,
	},
	box: {
		width: "100%",
		height: 0,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#ffd54f",
		position: "relative",
		flex: 0.6,
		overflow: "hidden",
	},
});
