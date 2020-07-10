import React, { useContext } from "react";
import { View } from "react-native";
import { DataContext } from "../context";

const Status = () => {
  const { data } = useContext(DataContext);
  const good = "#76ff03";
  const danger = "#d50000";
  const statusStyles = {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: data[0].timbersaw ? good : danger,
  };
  return <View style={statusStyles}></View>
};

export default Status;

