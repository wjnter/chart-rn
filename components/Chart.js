import React, { Component } from "react";
import {
	Text,
	View,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export class Chart extends Component {
	state = {
		labels: [""],
		data: [0],
		daily: true,
	};

	handleUpdateData = () => {
		const { labels, data, daily } = this.props;

		const newData = [...this.state.data];
		const newLabels = [...this.state.labels];
		const labelsForAvg = [""];
		const dateForAvg = [0];

		if (daily) {
			newLabels.push(labels);
			newLabels.length > 10 && newLabels.shift();
			newData.push(data);
			newData.length > 10 && newData.shift();
		} else {
			labelsForAvg.push(...labels);
			dateForAvg.push(...data);
			while (labelsForAvg.length >= 10) {
				labelsForAvg.shift();
				dateForAvg.shift();
			}
		}

		daily
			? this.setState({
					labels: newLabels,
					data: newData,
			  })
			: this.setState({
					labels: labelsForAvg,
					data: dateForAvg,
			  });
	};

	componentDidUpdate(prevProps) {
		const { labels, daily, data } = this.props;
		if (labels !== prevProps.labels) {
			this.handleUpdateData();
		}
	}

	render() {
		const { labels, data } = this.state;
		const { unit } = this.props;
		return (
			<View>
				<View style={styles.title}>
					<Text>Bezier Line Chart</Text>
				</View>
				<LineChart
					data={{
						labels,
						datasets: [{ data }],
					}}
					width={Dimensions.get("window").width} // from react-native
					height={280}
					yAxisSuffix={unit}
					yAxisInterval={1} // optional, defaults to 1
					verticalLabelRotation={30}
					chartConfig={{
						backgroundColor: "#e26a00",
						backgroundGradientFrom: "#fb8c00",
						backgroundGradientTo: "#ffa726",
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16,
						},
						propsForDots: {
							r: "6",
							strokeWidth: "2",
							stroke: "#ffa726",
						},
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	title: {
		flex: 1,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});
export default Chart;
