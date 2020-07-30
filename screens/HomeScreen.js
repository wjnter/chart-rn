import React, { useState, useContext, useEffect } from "react";
import Chart from "../components/Chart";
import { DataContext } from "../context";
import { Colors } from "react-native-paper";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import Constants from "expo-constants";
import Collapsible from "react-native-collapsible";
import Status from "../components/Status";
import Notification from "../components/Notification";
import { calculateTime } from "../utils";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

const Battery = () => {
	const { data } = useContext(DataContext);
	const [count, setCount] = useState(data[0].battery || 0);
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

	useEffect(() => setCount(data[0].battery || 0), [data[0].battery]);
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
				<View style={styles.box}>
					<View style={setProgress()}></View>
					<View style={{ flex: 1, alignSelf: "center", bottom: 2 }}>
						<Text style={{ flex: 1 }}>{count === 0 ? "" : count + "%"}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === "FirstNode") {
						iconName = "linechart";
					} else if (route.name === "SecondNode") {
						iconName = "areachart";
					}
					// return <AntDesign name={iconName} size={24} color="black" />;
				},
			})}
			tabBarOptions={{
				activeTintColor: "tomato",
				inactiveTintColor: "gray",
				labelStyle: { fontSize: 16, fontWeight: "600" },
			}}
		>
			<Tab.Screen name="Nút 1" component={FirstNode} />
			<Tab.Screen name="Nút 2" component={SecondNode} />
		</Tab.Navigator>
	);
}

// Node 1
const FirstNode = () => {
	const [collapsed, setCollapsed] = useState(true);
	const { data, category, websocket, avgData } = useContext(DataContext);

	const sendData = () => {
		try {
			websocket.send("getAvgData"); //send data to the server
		} catch (error) {
			console.log(error); // catch error
		}
	};

	const handleCollapse = () => setCollapsed(!collapsed);
	useEffect(() => {
		if (!collapsed) sendData();
	}, [collapsed]);
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ paddingTop: 10 }}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>ĐỒ THỊ THỜI GIAN THỰC</Text>
					<Status />
					<Battery />
				</View>
				<Chart labels={category} data={data[0].gas} daily unit={" %"} />
				<Chart
					labels={category}
					data={data[0].temperature}
					daily
					unit={" °C"}
				/>
				<View style={styles.button}>
					<Button
						title="Xem theo ngày"
						type="outline"
						onPress={() => handleCollapse()}
						buttonStyle={{ width: 160 }}
					/>
				</View>
				<Collapsible collapsed={collapsed} align="center">
					{!collapsed && (
						<>
							<Chart
								labels={avgData.category}
								data={avgData.data[0].avgGas}
								daily={false}
								unit={" %"}
							/>
							<Chart
								labels={avgData.category}
								data={avgData.data[0].avgTemperature}
								daily={false}
								unit={" °C"}
							/>
						</>
					)}
				</Collapsible>
			</ScrollView>
		</View>
	);
};

// 	Node 2
const SecondNode = () => {
	const [collapsed, setCollapsed] = useState(true);
	const { data, category, websocket, avgData } = useContext(DataContext);

	const sendData = () => {
		try {
			websocket.send("getAvgData"); //send data to the server
		} catch (error) {
			console.log(error); // catch error
		}
	};

	const handleCollapse = () => setCollapsed(!collapsed);
	useEffect(() => {
		if (!collapsed) sendData();
	}, [collapsed]);
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ paddingTop: 10 }}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>ĐỒ THỊ THỜI GIAN THỰC</Text>
					<Status />
					<Battery />
				</View>
				<Chart labels={category} data={data[1].gas} daily unit={" %"} />
				<Chart
					labels={category}
					data={data[1].temperature}
					daily
					unit={" °C"}
				/>
				<View style={styles.button}>
					<Button
						title="Xem theo ngày"
						type="outline"
						onPress={() => handleCollapse()}
						buttonStyle={{ width: 160 }}
					/>
				</View>
				<Collapsible collapsed={collapsed} align="center">
					{!collapsed && (
						<>
							<Chart
								labels={avgData.category}
								data={avgData.data[1].avgGas}
								daily={false}
								unit={" %"}
							/>
							<Chart
								labels={avgData.category}
								data={avgData.data[1].avgTemperature}
								daily={false}
								unit={" °C"}
							/>
						</>
					)}
				</Collapsible>
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
		flex: 0.75,
		textAlign: "center",
		fontSize: 22,
		fontWeight: "300",
		marginBottom: 5,
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
	titleContainer: {
		flex: 1,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	battery: {
		flex: 0.25,
		flexDirection: "row",
		alignSelf: "center",
	},
	titleItem: {
		flex: 0.6,
	},
	box: {
		width: 100,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: Colors.amber300,
		margin: 20,
		position: "relative",
		flex: 1,
		overflow: "hidden",
	},
	button: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
	},
});
