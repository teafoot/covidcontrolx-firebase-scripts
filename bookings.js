Date.prototype.getMondayOfWeek = function () { // Monday
	let copy = new Date(this);
	return new Date(copy.setDate(copy.getDate() - copy.getDay() + (copy.getDay() == 0 ? -6 : 1)));
}
Date.prototype.getTuesdayOfWeek = function () { // Tuesday
	let copy = new Date(this);
	return new Date(copy.setDate(copy.getDate() - copy.getDay() + (copy.getDay() == 0 ? -5 : 2)));
}
Date.prototype.getWednesdayOfWeek = function () { // Wednesday
	let copy = new Date(this);
	return new Date(copy.setDate(copy.getDate() - copy.getDay() + (copy.getDay() == 0 ? -4 : 3)));
}
Date.prototype.getThursdayOfWeek = function () { // Thursday
	let copy = new Date(this);
	return new Date(copy.setDate(copy.getDate() - copy.getDay() + (copy.getDay() == 0 ? -3 : 4)));
}
Date.prototype.getFridayOfWeek = function () { // Friday
	let copy = new Date(this);
	return new Date(copy.setDate(copy.getDate() - copy.getDay() + (copy.getDay() == 0 ? -2 : 5)));
}
Date.prototype.getSaturdayOfWeek = function () { // Saturday
	let copy = new Date(this);
	return new Date(copy.setDate(copy.getDate() - copy.getDay() + (copy.getDay() == 0 ? -1 : 6)));
}
Date.prototype.getSundayOfWeek = function () { // Sunday
	let copy = new Date(this);
	return new Date(copy.setDate(copy.getDate() - copy.getDay() + 7));
}
Date.prototype.getTomorrow = function () {
	let copy = new Date(this);
	// return new Date(copy.setHours(0, 0, 0, 0) + 86400000); // doesn't work correctly
	return new Date(copy.setTime(copy.getTime() + (24 * 60 * 60 * 1000)));
}
function formatDate(date) {
	return date.toLocaleDateString('en-CA'); // yyyy-MM-dd
}

module.exports = {
	getBookingDates: function () {
		var bookingDates = [];
		var current = new Date();
		var totalWeeks = 20; // including current week
		for (let i = 0; i < totalWeeks; i++) {
			if (formatDate(current) == formatDate(current.getMondayOfWeek())) { // give tue-fri to book
				bookingDates.push(formatDate(current.getTuesdayOfWeek()));
				bookingDates.push(formatDate(current.getWednesdayOfWeek()));
				bookingDates.push(formatDate(current.getThursdayOfWeek()));
				bookingDates.push(formatDate(current.getFridayOfWeek()));

				current = current.getFridayOfWeek();
			} else if (formatDate(current) == formatDate(current.getTuesdayOfWeek())) { // give wed-fri to book
				bookingDates.push(formatDate(current.getWednesdayOfWeek()));
				bookingDates.push(formatDate(current.getThursdayOfWeek()));
				bookingDates.push(formatDate(current.getFridayOfWeek()));

				current = current.getFridayOfWeek();
			} else if (formatDate(current) == formatDate(current.getWednesdayOfWeek())) { // give thu-fri to book
				bookingDates.push(formatDate(current.getThursdayOfWeek()));
				bookingDates.push(formatDate(current.getFridayOfWeek()));

				current = current.getFridayOfWeek();
			} else if (formatDate(current) == formatDate(current.getThursdayOfWeek())) { // give fri to book
				bookingDates.push(formatDate(current.getFridayOfWeek()));

				current = current.getFridayOfWeek();
			}

			//// there's a bug in current.getSundayOfWeek(), if today is sunday it returns the next sunday and not this sunday (today)
				// if (formatDate(current) == formatDate(current.getFridayOfWeek()) ||
				// 	formatDate(current) == formatDate(current.getSaturdayOfWeek()) ||
				// 	formatDate(current) == formatDate(current.getSundayOfWeek())) { // if fri-sun, go to next week monday to book
				// 	current = current.getSundayOfWeek();
				// 	current = current.getTomorrow(); // mon
				// 	bookingDates.push(formatDate(current));
				// }

			if (formatDate(current) == formatDate(current.getFridayOfWeek()) ||
				formatDate(current) == formatDate(current.getSaturdayOfWeek())) { // if fri-sun, go to next week monday to book
				current = current.getSundayOfWeek();
				current = current.getTomorrow(); // mon
				bookingDates.push(formatDate(current));
			} else { // sunday
				current = current.getTomorrow(); // mon
				bookingDates.push(formatDate(current));
			}
		}

		bookingDates.pop(); // just remove the extra monday
		// console.log({bookingDates});

		return bookingDates;
	}
}

