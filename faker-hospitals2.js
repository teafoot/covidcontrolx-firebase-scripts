var faker = require('faker');
var fs = require("fs");
// var USHospitals = require('./data/us_hospitals1.json');
var USHospitals = require('./data/us_hospitals10.json');
// var USHospitals = require('./data/us_hospitals.json');
var dates = require('./bookings');

var json = {};
var hospitals = [];
json.hospitals=hospitals;
USHospitals.forEach(USHospital => {
	var hospital = {};

	// Hospital Details
	hospital.hospital_id = USHospital.hospital_id;
	hospital.code = faker.datatype.uuid();
	hospital.name = USHospital.name;
	var randomHospitalPhone = faker.phone.phoneNumber();
	hospital.phone = randomHospitalPhone;
	var randomHospitalImage = faker.image.imageUrl();
	hospital.image = randomHospitalImage;
	hospital.location = {
		"street_address": USHospital.street_address,
		"city": USHospital.city,
		"county": USHospital.county,
		"state": USHospital.state,
		"zip_code": USHospital.zip_code,
		"country_code": USHospital.country_code,
		"lat": null,
		"lng": null
	};

	// Hospital Services
	hospital.services = {};
	var hospitalServices = ["vaccination", "pcr_test", "rapid_test"];
	const shuffledHospitalServices = hospitalServices.sort(() => 0.5 - Math.random());
	var numServices = Math.floor(Math.random() * 3) + 1; // 1 to 3
	let selectedHospitalServices = shuffledHospitalServices.slice(0, numServices); // 1-3 services
	const vaccineTypes = ["Moderna", "Pfizer", "J&J", "Astrazeneca"];
	if (selectedHospitalServices.includes("vaccination")) {
		hospital.services["vaccination"] = [];
		var modernaQty = 0 + Math.floor(Math.random() * 90000); // will give a number from 0 to 99999 (inclusive)
		if (modernaQty > 0) {
			hospital.services["vaccination"].push({
				"vaccine_id": 1,
				"name": "Moderna",
				"description": "moderna desc",
				"dosage_amount": "0.45mL/dose",
				"efficacy": 0.752,
				"side_effects": [
					"Headache",
					"Fatigue",
					"Nausea",
					"Muscle pain",
					"Fever",
					"Vomit"
				],
				"qty_available": modernaQty
			});
		}
		var pfizerQty = 0 + Math.floor(Math.random() * 90000); // will give a number from 0 to 99999 (inclusive)
		if (pfizerQty > 0) {
			hospital.services["vaccination"].push({
				"vaccine_id": 2,
				"name": "Pfizer",
				"description": "pfizer desc",
				"dosage_amount": "0.5mL/dose",
				"efficacy": 0.852,
				"side_effects": ["Headache", "Nausea", "Fever", "Vomit"],
				"qty_available": pfizerQty
			});
		}
		var jjQty = 0 + Math.floor(Math.random() * 90000); // will give a number from 0 to 99999 (inclusive)
		if (jjQty > 0) {
			hospital.services["vaccination"].push({
				"vaccine_id": 3,
				"name": "J&J",
				"description": "J&J desc",
				"dosage_amount": "0.6mL/dose",
				"efficacy": 0.8,
				"side_effects": ["Fatigue", "Nausea", "Muscle pain", "Fever"],
				"qty_available": jjQty
			});
		}
		var azQty = 0 + Math.floor(Math.random() * 90000); // will give a number from 0 to 99999 (inclusive)
		if (azQty > 0) {
			hospital.services["vaccination"].push({
				"vaccine_id": 4,
				"name": "Astrazeneca",
				"description": "Astrazeneca desc",
				"dosage_amount": "0.7mL/dose",
				"efficacy": 0.85,
				"side_effects": ["Headache", "Fatigue", "Fever", "Vomit"],
				"qty_available": azQty
			});
		}
	}
	if (selectedHospitalServices.includes("pcr_test")) {
		var pcrSwabQty = 0 + Math.floor(Math.random() * 90000); // will give a number from 0 to 99999 (inclusive)
		hospital.services["pcr_test"] = {
			"swab_qty": pcrSwabQty
		};
	}
	if (selectedHospitalServices.includes("rapid_test")) {
		var rapidSwabQty = 0 + Math.floor(Math.random() * 90000); // will give a number from 0 to 99999 (inclusive)
		hospital.services["rapid_test"] = {
			"swab_qty": rapidSwabQty
		};
	}

	// Hospital Bookings
	hospital.bookings = [];
	var bookingDates = dates.getBookingDates();
	// console.log({bookingDates});
	bookingDates.forEach(bookingDate => {
		let booking = {};
		booking.date = bookingDate;
		booking.timeslots = [];

		var timeRanges = [
			"09:00-09:30",
			"09:30-10:00",
			"10:00-10:30",
			"10:30-11:00",
			"11:00-11:30",
			"11:30-12:00",
			"12:00-12:30",
			"12:30-13:00",
			"13:00-13:30",
			"13:30-14:00",
			"14:00-14:30",
			"14:30-15:00",
			"15:00-15:30",
			"15:30-16:00",
			"16:00-16:30",
			"16:30-17:00",
		];
		let id = 1;
		timeRanges.forEach(timeRange => {
			var timeslot = {};
			timeslot.timeslot_id = id++;

			var timestart = timeRange.split("-")[0];
			var timeend = timeRange.split("-")[1];
			timeslot.timestart = timestart;
			timeslot.timeend = timeend;

			var randomTimeslotStatus = faker.datatype.boolean(); // 1 is occupied, 0 is free
			timeslot.status = (randomTimeslotStatus == 1) ? "occupied" : "free";
			if (timeslot.status === "occupied") {
				const shuffledSelectedHospitalServices = selectedHospitalServices.sort(() => 0.5 - Math.random());
				let selectedHospitalService = shuffledSelectedHospitalServices.slice(0, 1); // 1 service
				if (selectedHospitalService[0] == "vaccination") {
					timeslot.service_type = "vaccination";

					var randomNationalID = 1000000 + Math.floor(Math.random() * 9000000); // will give a number from 1000000 to 9999999 (inclusive)
					var randomFirstName = faker.name.firstName();
					var randomLastName = faker.name.lastName();
					var randomDOB = faker.date.between('1930-01-01', '2010-12-31');
					var randomPhone = faker.phone.phoneNumber();
					var randomEmail = faker.internet.email(randomFirstName, randomLastName);
					var randomVaccineType = vaccineTypes[Math.floor(Math.random() * vaccineTypes.length)]; // Generate from 1 to length
					var randomVaccineShot = randomVaccineType == "J&J" ? 1 : Math.floor(Math.random() * 3) + 1; // 1 dose for J&J, up to 3 doses for the rest
					var vaccinationLocation = USHospital.street_address + ", " + USHospital.city + ", " + USHospital.county + ", " + USHospital.state + ", " + USHospital.zip_code + ", " + USHospital.country_code;
					// var vaccinationQRCode = faker.datatype.uuid();

					timeslot.patient_certificate = {
						"national_id": randomNationalID,
						"first_name": randomFirstName,
						"last_name": randomLastName,
						"date_of_birth": randomDOB,
						"phone_number": randomPhone,
						"email": randomEmail,
						"vaccine_type": randomVaccineType,
						"vaccine_shot": randomVaccineShot,
						"vaccinationLocation": vaccinationLocation,
						"vaccinationDate": bookingDate
						// ,"qr_code": vaccinationQRCode
					};
				}
				if (selectedHospitalService[0] == "pcr_test") {
					timeslot.service_type = "pcr_test";
				}
				if (selectedHospitalService[0] == "rapid_test") {
					timeslot.service_type = "rapid_test";
				}
			} else if (timeslot.status === "free") {
				// timeslot.patient_certificate = {};
				timeslot.patient_certificate = null;
			}

			booking.timeslots.push(timeslot);
		});

		hospital.bookings.push(booking);
	});

	hospitals.push(hospital);
});

console.log(JSON.stringify(json, null, 2));

fs.writeFile("./data/hospitals_generation2.json", JSON.stringify(json, null, 4), (err) => {
	if (err) { console.error(err); return; };
	console.log("File has been created");
});
