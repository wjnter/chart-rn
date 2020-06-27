export const CONSTANT_TYPE = ["gas", "temperature", "battery"];
export const CONSTANT_TYPE_AVG = ["avggas", "avgtemperature"];
export const handleSetState = ({
	type,
	valueNode1,
	valueNode2,
	category,
	newData,
}) => {
	const clonedData = [
		{ ...newData[0], [type]: valueNode1 },
		{ ...newData[1], [type]: valueNode2 },
	];
	newData = [...clonedData];
	return [newData, category];
};
