# Gramstamatic

Share photos with your friends, without handing all your sensitive data over to Facebook. 

(In other words, it's like Instagram, but without the intrusive data surveillance and incessant marketing!)

## Description

This implementation began as the output from a TailwindCSS tutorial. I connected it to a Firebase backend. Right now it includes working login and signup functions...

LOGIN IMAGE TK

SIGNUP IMAGE TK

The app also provides the ability to follow other accounts...

PROFILE GALLERY IMAGE 

FEED IMAGE

... and to like and comment on photos.

DETAIL IMAGE

It also features a viewport-responsive layout.

RESPONSIVE IMAGE 1

RESPONSIVE IMAGE 2


See [Roadmap](#Roadmap) below for planned upgrades.

## Getting Started

### Installing

* Fork/clone the repo
* [Create a Firebase project](https://firebase.google.com/docs/guides) for your app
* In the Firestore Database, create collections named 'users' and 'photos'

### Executing program
To run the app locally in development mode:

* Install dependencies
  ```sh
  npm install
  ```
* Update the Firebase config in `src/services/firebase.js` with the info from your Firebase project info screen:
  ```js
  const config = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'your_authDomain.firebaseapp.com',
    projectId: 'your_projectId',
    storageBucket: 'your_storageBucket.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'YOUR_MEASUREMENT_ID'
  };
  ```
  If you don't add your own Firebase project info, you'll be using mine, which probably isn't ideal.

* Start dev server
  ```sh
  npm run start
  ```

The Gramstamatic UI will now be available at http://localhost:3000/

## Roadmap

This is a 'proof of concept' release to demo the combination of TailwindCSS (frontend styling) and Firebase (simple auth/auth). Planned for future releases:

* Account management, including ability to upload photos
* Animated transitions
* Simple image editing


## Acknowledgments

Big kudos to [Karl Hadwen](https://github.com/karlhadwen) for a super thorough tutorial.

These tools make this project way more manageable than it looks!

* [TailwindCSS](https://github.com/tailwindlabs/tailwindcss)
* [Create React App](https://github.com/facebook/create-react-app)
* [Firebase JavaScript SDK](https://github.com/firebase/firebase-js-sdk)

