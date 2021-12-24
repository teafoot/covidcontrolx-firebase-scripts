// dont use firebase 9.1.2
// firebase-admin 9.12.0
// firestore-export-import: 0.17.0

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

const filename = 'hospitals_generation2';
const collection = 'hospitals';

const file = require(`./data/${filename}.json`);
file[`${collection}`].forEach(function (obj) {
    db.collection(`${collection}`).add(obj)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
});