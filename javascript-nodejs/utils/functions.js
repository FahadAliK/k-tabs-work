module.exports.getSecondsDifference = function (date1, date2) {
	const timestamp1 = date1.getTime();
	const timestamp2 = date2.getTime();
	const differenceInMilliseconds = Math.abs(timestamp2 - timestamp1);
	const differenceInSeconds = differenceInMilliseconds / 1000;
	return differenceInSeconds;
};
