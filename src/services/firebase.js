import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyBI_c5UBou4OhfAaapSzIVFgUXMMzN9sQw',
  authDomain: 'gramm-fans.firebaseapp.com',
  projectId: 'gramm-fans',
  storageBucket: 'gramm-fans.appspot.com',
  messagingSenderId: '401933393341',
  appId: '1:401933393341:web:0fa1c98f3def91cdd506d4',
  measurementId: 'G-T9ZML7PN1W'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// call seed file - only once
// seedDatabase(firebase);

export { firebase, FieldValue };
