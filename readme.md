# 💉Covid Control X - Data generation tool💉 #

### Features

* Generate Mock Data for App: Hospitals, Services, Vaccines, Booking date/timeslots, Patient Details, Certificates
* Import/Export JSON data from/to Firestore
    
### Usage Instructions

1. npm install
2. Run in cmd/terminal:
    * node faker-hospitals2.js
        * This file will generate all data which our app will consume into a JSON file (/data/hospitals_generation2.json) which will be inserted into a Firestore collection later on.
    * node json-to-firestore.js
        * This file will insert/import the generated JSON file in previous command into a Firestore collection called "hospitals".
        * Remember to specify your firebase config file parameters settings into the firebaseConfig variable.
    * node firestore-to-json.js
        * This file will export the collection "hospitals" from Firestore into a JSON file for easier/faster viewing (/data/firestore-data2.json)
        * Remember to specify your firebase config file parameters settings into the firebaseConfig variable.
        
---




