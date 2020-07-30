import React, { useContext, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { DataContext } from "../context";
import Notification from "./Notification";

const Status = ({ data }) => {
	const [visible, setVisible] = useState(false);
	const good = "#76ff03";
	const danger = "#d50000";
	const statusStyles = {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: data ? good : danger,
	};
	const getVisible = (visibleProps) => setVisible(!visibleProps);
	const body = data
		? "Khu rừng đang an toàn!"
		: "Đang phát hiện âm thanh cưa máy!!";
	return (
		<View>
			<Notification
				visible={visible}
				title={"Tình trạng lâm tặc"}
				body={body}
				getVisible={getVisible}
			/>
			<TouchableOpacity
				style={styles.wrapper}
				onPress={() => setVisible(!visible)}
			>
				<Text style={{ marginBottom: 7, fontWeight: "500" }}>Tình trạng</Text>
				<View style={statusStyles}></View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 0.3,
		alignItems: "center",
		justifyContent: "space-between",
		height: 60,
	},
});

export default Status;
