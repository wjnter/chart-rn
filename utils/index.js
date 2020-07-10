export const CONSTANT_TYPE = ["gas", "temperature", "battery", "timbersaw"];
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

export const calculateTime = time => {
	const hour = Math.floor(time);
	const minute = +(time % 1).toFixed(1) * 60;
	return `${hour} ${hour > 1 ? 'hours' : 'hour'} ${minute} ${minute > 1 ? 'minutes' : 'minute'}`
}