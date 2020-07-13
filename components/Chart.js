import React, { Component } from "react";
import {
	Text,
	View,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Notification from "./Notification";

export class Chart extends Component {
	state = {
		labels: [""],
		data: [0],
		daily: true,
		pointedData: "",
		index: 0,
		visible: false,
	};

	handleUpdateData = () => {
		const { labels, data, daily } = this.props;

		const newData = [...this.state.data];
		const newLabels = [...this.state.labels];
		const labelsForAvg = [""];
		const dateForAvg = [0];

		if (daily) {
			newData.push(data);
			newLabels.push(labels);
			newLabels.length > 10 && newLabels.shift();
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

	getVisible = (visibleProps) => this.setState({ visible: !visibleProps });

	componentDidUpdate(prevProps) {
		const { labels, daily, data } = this.props;
		if (labels !== prevProps.labels) {
			this.handleUpdateData();
		}
	}
	showData = ({ index, value }) => {
		this.setState({
			visible: !this.state.visible,
			pointedData: value,
			index,
		});
	};

	render() {
		const { labels, data, visible, pointedData, index } = this.state;
		const { unit, daily } = this.props;
		return (
			<View>
				<View style={styles.title}>
					<Text>Bezier Line Chart</Text>
				</View>
				<Notification
					visible={visible}
					title={"chart"}
					body={`${pointedData + unit.trim()} at ${labels[index]}`}
					getVisible={this.getVisible}
				/>
				<LineChart
					data={{
						labels,
						datasets: [{ data }],
					}}
					onDataPointClick={this.showData}
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
