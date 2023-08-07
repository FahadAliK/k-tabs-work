exports.getTimeStamp = function () {
	// Create a new Date object representing the current date and time
	const currentDate = new Date();

	// Get hours, minutes, and seconds from the Date object
	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();
	const seconds = currentDate.getSeconds();

	// Determine whether it's AM or PM
	// const amOrPm = hours >= 12 ? 'PM' : 'AM';

	// Convert hours to 12-hour format
	// const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

	// Add leading zero to minutes and seconds if they are less than 10
	// const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	// const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

	// Combine all the parts to get the formatted time with AM/PM
	// const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
	const formattedTime = `${hours}:${minutes}:${seconds}`;

	// console.log(formattedTime);
	return formattedTime;
};
