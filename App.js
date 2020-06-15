import React, { useState, useEffect, Component } from "react";
import {
	Text,
	View,
	Dimensions,
	StyleSheet,
	Button,
	TouchableOpacity,
} from "react-native";
import { CONSTANT_TYPE } from "./utils/index";
import Chart from "./components/Chart";
import FormLogin from "./components/FormLogin";

export default class App extends Component {
	formRef = React.createRef();
	constructor(props) {
		super(props);

		this.state = {
			ws: null,
			category: "",
			data: {
				flame: 0,
				gas: 0,
				temperature: 0,
				humidity: 0,
			},
		};
	}

	// componentDidMount() {
	// 	this.connect();
	// }

	// timeout = 250; // Initial timeout duration as a class variable

	// connect = () => {
	// 	var ws = new WebSocket("ws://localhost:3300");
	// 	// var ws = new WebSocket("ws://ute-endgame.herokuapp.com");
	// 	let that = this; // cache the this
	// 	var connectInterval;

	// 	// websocket onopen event listener
	// 	ws.onopen = () => {
	// 		console.log("connected websocket main component");

	// 		this.setState({ ws });

	// 		that.timeout = 250; // reset timer to 250 on open of websocket connection
	// 		clearTimeout(connectInterval); // clear Interval on on open of websocket connection
	// 	};

	// 	// websocket onclose event listener
	// 	ws.onclose = (e) => {
	// 		console.log(
	// 			`Socket is closed. Reconnect will be attempted in ${Math.min(
	// 				10000 / 1000,
	// 				(that.timeout + that.timeout) / 1000
	// 			)} second.`,
	// 			e.reason
	// 		);

	// 		that.timeout = that.timeout + that.timeout; //increment retry interval
	// 		connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
	// 	};

	// 	ws.onmessage = (evt) => {
	// 		this.handleUpdateData(evt.data);
	// 	};

	// 	// websocket onerror event listener
	// 	ws.onerror = (err) => {
	// 		console.error(
	// 			"Socket encountered error: ",
	// 			err.message,
	// 			"Closing socket"
	// 		);

	// 		ws.close();
	// 	};
	// };
	// check = () => {
	// 	const { ws } = this.state;
	// 	if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
	// };
	// handleUpdateData = (message) => {
	// 	const data = JSON.parse(message);
	// 	data &&
	// 		data.map(({ type, time, value }) => {
	// 			CONSTANT_TYPE.map(
	// 				(item) =>
	// 					item === type &&
	// 					this.handleSetState({ type, data: value, category: time })
	// 			);
	// 			return true;
	// 		});
	// };
	// handleSetState = ({ type, data, category }) => {
	// 	this.setState({
	// 		category,
	// 		data: {
	// 			...this.state.data,
	// 			[type]: data,
	// 		},
	// 	});
	// };

	// validateLogin = ({ email, password }) => {

	// }

	getUserInfo = ({ email, password }) => {
		console.log({ email, password });
	};

	render() {
		const { category, data } = this.state;
		return (
			<View style={styles.container}>
				<Text>Hello world </Text>
				{/* <Chart labels={category} data={data.gas} /> */}
				<FormLogin getUserInfo={this.getUserInfo} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ecf0f1",
	},
});

// function HomeScreen() {
//   const [dataState, setDataState] = useState(datasets);
//   const [idInterval, setIdInterval] = useState(0);
//   useEffect(() => {
//     const idInterval = setInterval(() => {
//       const randomData = Math.random() * 100;
//       datasets[0].data.push(randomData);
//       datasets[0].data.shift();
//       console.log("state:::::::::", dataState);
//       setDataState(datasets);
//       setIdInterval(idInterval);
//     }, 5000);
//   }, [datasets]);

//   const onClearTimer = () => () => clearInterval(idInterval);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={onClearTimer}>
//         <Text>Clear Timber</Text>
//       </TouchableOpacity>
//       <Text>Bezier Line Chart</Text>
//       <LineChart
//         data={{
//           labels,
//           datasets: dataState
//         }}
//         onDataPointClick={(value, dataset, getColor) => {
//           console.log("value dataset getColor", [value, dataset, getColor]);
//         }}
//         width={Dimensions.get("window").width} // from react-native
//         height={220}
//         yAxisLabel="$"
//         yAxisSuffix="k"
//         yAxisInterval={1} // optional, defaults to 1
//         chartConfig={{
//           backgroundColor: "#e26a00",
//           backgroundGradientFrom: "#fb8c00",
//           backgroundGradientTo: "#ffa726",
//           decimalPlaces: 2, // optional, defaults to 2dp
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           style: {
//             borderRadius: 16
//           },
//           propsForDots: {
//             r: "6",
//             strokeWidth: "2",
//             stroke: "#ffa726"
//           }
//         }}
//         bezier
//         style={{
//           marginVertical: 8,
//           borderRadius: 16
//         }}
//       />
//       </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }
