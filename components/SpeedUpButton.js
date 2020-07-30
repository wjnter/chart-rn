import React, { useState, useContext, useEffect } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	Picker,
	TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { DataContext } from "../context";

const SpeedUp = ({ nodeName }) => {
	const selection = [
		{ name: nodeName, value: 15, title: "15 giây" }, // 15s
		{ name: nodeName, value: 60, title: "1 phút" }, // 60s
		{ name: nodeName, value: 300, title: "5 phút" }, // 5m
		{ name: nodeName, value: 600, title: "10 phút" }, // 10m
		{ name: nodeName, value: 1200, title: "20 phút" }, // 20m
	];
	const { websocket } = useContext(DataContext);

	const [selectedValue, setSelectedValue] = useState(selection[0].value);
	const [sendD, setSendD] = useState(false);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(selectedValue);
	const [modalVisible, setModalVisible] = useState(false);
	const selectedObj = selection.find((s) => s.value === value);

	const message = ["interval", { ...selectedObj }];

	const sendData = () => {
		try {
			websocket.send(JSON.stringify(message)); //send data to the server
		} catch (error) {
			console.log(error); // catch error
		}
	};

	useEffect(() => {
		if (value === selectedValue && sendD) {
			sendData();
			setSendD(false);
		}
	});

	return (
		<View style={styles.wrapper}>
			<Modal animationType="slide" transparent={true} visible={modalVisible}>
				<View style={styles.centeredView}>
					<View style={styles.pickerContainer}>
						<Text
							style={{
								fontSize: 18,
								textAlign: "center",
								marginTop: 6,
								fontWeight: "500",
							}}
						>
							Chọn Thời Gian Gửi
						</Text>
						<Picker
							selectedValue={open ? value : selectedValue}
							style={{
								height: 50,
								width: 150,
								marginLeft: 25,
							}}
							onValueChange={(itemValue, itemIndex) => {
								setOpen(false);
								setSelectedValue(itemValue);
							}}
						>
							{selection.map((s, idx) => (
								<Picker.Item key={idx} label={s.title} value={s.value} />
							))}
						</Picker>
					</View>
					<View style={styles.buttonGroup}>
						<TouchableHighlight
							style={{ ...styles.openButton, backgroundColor: "#d64545" }}
							onPress={() => {
								setOpen(true);
								setModalVisible(!modalVisible);
							}}
						>
							<Text style={styles.textStyle}>Hủy</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
							onPress={() => {
								setValue(selectedValue);
								setModalVisible(!modalVisible);
								setSendD(true);
							}}
						>
							<Text style={styles.textStyle}>Chọn</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>

			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<Text style={{ marginBottom: 14, fontWeight: "500" }}>Chu kỳ</Text>
				<Icon name="ios-timer" type="ionicon" color="#ffa726" size={32} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	pickerContainer: {
		width: 200,
		height: 200,
		backgroundColor: "#fff",
		borderRadius: 20,
		overflow: "hidden",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	openButton: {
		borderRadius: 20,
		padding: 10,
		marginHorizontal: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.32,
		shadowRadius: 5.46,

		elevation: 9,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	wrapper: {
		flex: 0.3,
		alignItems: "center",
		// justifyContent: "space-between",
	},
	buttonGroup: {
		flex: 0.1,
		alignItems: "center",
		flexDirection: "row",
		marginTop: 7,
	},
});

export default SpeedUp;
