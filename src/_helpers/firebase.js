import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCwld0JbdjqPc9KXtx33N_5xDUYqW4lqY0",
  authDomain: "lakeishaapp.firebaseapp.com",
  databaseURL: "https://lakeishaapp.firebaseio.com",
  projectId: "lakeishaapp",
  storageBucket: "lakeishaapp.appspot.com",
  messagingSenderId: "811788334795",
  appId: "1:811788334795:web:9deb8890b70b09052dcd4e",
  measurementId: "G-SR6CT06TB5"
}

firebase.initializeApp(config);
export default firebase;