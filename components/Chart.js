import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import {
  LineChart
} from "react-native-chart-kit";

export class Chart extends Component {
  state = {
    labels: [''],
    data: [0]
  }

  handleUpdateData = () => {
    const { data, labels } = this.state;
    const newData = [ ...data ];
    const newLabels = [ ...labels ];
    newLabels.push(this.props.labels);
    newLabels.length > 10 && newLabels.shift();

    newData.push(this.props.data);
    newData.length > 10 && newData.shift();
    console.log(":::::newdata", newData);
    console.log(":::::newLabels", newLabels);
    this.setState({
      labels: newLabels,
      data: newData
    })
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.labels !== prevProps.labels) {
      this.handleUpdateData();
    }
  }

  render() {
    const { labels, data } = this.state;
    console.log(":::state: ", this.state);
    console.log(":::props: ", this.props);
    return (
      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data }]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View> 
    )
  }
}

export default Chart
