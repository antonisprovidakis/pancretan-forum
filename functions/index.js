const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createProfile = functions.auth.user().onCreate( event => {
	return admin.database().ref(`/users/${event.data.uid}`).set({
	    name: event.data.displayName,
	    email: event.data.email,
	    photoURL: event.data.photoURL
  	});
});

exports.deleteProfile = functions.auth.user().onDelete( event => {
	return admin.database().ref(`/users/${event.data.uid}`).remove();
});