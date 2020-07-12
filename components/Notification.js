import React, { useState, useEffect } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	TouchableWithoutFeedback,
} from "react-native";

const Notification = ({ visible, title, body, getVisible }) => {
	const [modalVisible, setModalVisible] = useState(false);
	useEffect(() => {
		setModalVisible(visible);
	}, [visible]);
	return (
		<>
			{modalVisible && (
				<TouchableWithoutFeedback>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
						}}
					>
						<TouchableWithoutFeedback
							onPress={() => {
								setModalVisible(false);
								getVisible(visible);
							}}
						>
							{/* Modal content */}
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>{title}</Text>
									<Text style={styles.modalText}>{body}</Text>
									<TouchableHighlight
										style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
										onPress={() => {
											setModalVisible(false);
											getVisible(visible);
										}}
									>
										<Text style={styles.textStyle}>Hide Modal</Text>
									</TouchableHighlight>
								</View>
							</View>
							{/* End of Modal content */}
						</TouchableWithoutFeedback>
					</Modal>
				</TouchableWithoutFeedback>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		opacity: 0.7,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.85,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export default Notification;
