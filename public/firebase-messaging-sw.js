importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyCwld0JbdjqPc9KXtx33N_5xDUYqW4lqY0",
  authDomain: "lakeishaapp.firebaseapp.com",
  databaseURL: "https://lakeishaapp.firebaseio.com",
  projectId: "lakeishaapp",
  storageBucket: "lakeishaapp.appspot.com",
  messagingSenderId: "811788334795",
  appId: "1:811788334795:web:9deb8890b70b09052dcd4e",
  measurementId: "G-SR6CT06TB5"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();