
import React, { useState, useContext } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { DataContext } from "../context";
import { calculateTime } from '../utils'

const withModal = ({Component, title = "default", styleProps = ""}) => {
  
  return () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { data } = useContext(DataContext);
    const timeLife = (data[0].battery ||0) * 5/100;
    const bodyContent = {
      battery: `Module can live in ${calculateTime(timeLife)} remaining`,
      status: data[0].timbersaw ? "Everything is okay" : "I'm hearing sound of the timbersaw",
      default: ""
    }
    return (
      <>
        <TouchableWithoutFeedback>
          <Modal animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
              {/* Modal content */}
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{title}</Text>
                  {/* <Text style={styles.modalText}>{title.toLowerCase()}</Text> */}
                  <Text style={styles.modalText}>{bodyContent[title.toLowerCase()]}</Text>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
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
        <TouchableOpacity onPress={() => setModalVisible(true)}  style={styleProps} >
          {/* Component */}
          <Component />
          {/* End of Component */}
        </TouchableOpacity>
      </>
    );
  }
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.85,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default withModal;