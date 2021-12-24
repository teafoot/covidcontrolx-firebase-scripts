var fs = require("fs");
// dont use firebase 9.1.2
const firebase = require("firebase");
require("firebase/firestore");// Required for side-effects

const firebaseConfig = { // use your own firebase config file settings here
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var json = {};
json.hospitals = [];
db.collection("hospitals").get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
        json.hospitals.push(doc.data());
        // let data = JSON.stringify(doc.data(), null, 2);
        // console.log(`${doc.id} => ${data}`);
    });

    fs.writeFile("./data/firestore-data2.json", JSON.stringify(json, null, 4), (err) => {
        if (err) { console.error(err); return; };
        console.log("File has been created");
    });
});

