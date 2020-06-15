import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class WebsocketSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '0',
      open: false,
    };

    this.ws = new WebSocket('ws://localhost:3300/ws');
    this.emit = this.emit.bind(this);

    console.log('Constructor Called');
  }

  emit() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
    this.ws.send('It worked!');
  }

  componentDidMount() {
    this.ws.onopen = () => {
      console.log('Start Connection');
    };
    this.ws.onmessage = e => {
      // const data = JSON.parse(e.data).data;
      // console.log('d', data);
      // this.setState({ message: data });
      console.log("data received: ", e.data);
    };
    this.ws.onerror = e => {
      console.log('onerror', e.message);
    };
    this.ws.onclose = e => {
      console.log('onclose', e.code, e.reason);
    };
  }
  render() {
    return (
      <View>
        <Button
          onPress={this.emit}
          title={this.state.open ? 'Turn off' : 'Turn on'}
          color="#21ba45"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text>Hello {this.state.message}</Text>
      </View>
    );
  }
}