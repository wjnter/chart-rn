import React, { useState, useContext, useEffect } from "react";
import Chart from "../components/Chart";
import { DataContext } from "../context";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import Constants from "expo-constants";
import Collapsible from "react-native-collapsible";
import Status from "../components/Status";
import SpeedUp from "../components/SpeedUpButton";
import Battery from "../components/Battery";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === "Trạm 1") {
						iconName = "bar-chart";
					} else if (route.name === "Trạm 2") {
						iconName = "line-chart";
					}
					return (
						<Icon
							name={iconName}
							type="font-awesome"
							color={color}
							size={size}
						/>
					);
					// return <AntDesign name={iconName} size={24} color="black" />;
				},
			})}
			tabBarOptions={{
				activeTintColor: "tomato",
				inactiveTintColor: "gray",
				labelStyle: { fontSize: 16, fontWeight: "600" },
			}}
		>
			<Tab.Screen name="Trạm 1" component={FirstNode} />
			<Tab.Screen name="Trạm 2" component={SecondNode} />
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
				</View>
				<View style={styles.accessibility}>
					<SpeedUp nodeName="node1" />
					<Status data={data[0].timbersaw} />
					<Battery data={data[0].battery} />
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
						type={collapsed ? "outline" : "solid"}
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
				</View>
				<View style={styles.accessibility}>
					<SpeedUp nodeName="node2" />
					<Status data={data[1].timbersaw} />
					<Battery data={data[1].battery} />
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
						type={collapsed ? "outline" : "solid"}
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
		alignItems: "center",
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
		borderColor: "#ffd54f",
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
	accessibility: {
		flex: 1,
		justifyContent: "space-evenly",
		flexDirection: "row",
		alignItems: "flex-start",
		marginTop: 20,
		marginBottom: 20,
	},
});
