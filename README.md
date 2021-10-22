# Gramstamatic

Share photos with your friends, without handing all your sensitive data over to Facebook. 

(In other words, it's like Instagram, but without the intrusive data surveillance and incessant marketing!)

## Description

This implementation began as the output from a TailwindCSS tutorial. I connected it to a Firebase backend. Right now it includes working login and signup functions...

<img width="1520" alt="gramstamatic-signup" src="https://user-images.githubusercontent.com/42009003/138523679-80510ade-fbd4-47db-af78-a3e1df5cb1dc.png">

The app also provides the ability to follow other accounts...

<img width="1520" alt="gramstamatic-profile-gallery" src="https://user-images.githubusercontent.com/42009003/138523704-405ffb32-d866-4476-9758-6032f919c827.png">

<img width="1520" alt="gramstamatic-feed" src="https://user-images.githubusercontent.com/42009003/138523746-be840d19-ec69-4ec4-a505-d072e2627e1e.png">

... and to like and comment on photos.

<img width="1520" alt="gramstamatic-post-detail" src="https://user-images.githubusercontent.com/42009003/138523838-58268139-992e-4ea7-88f0-e653811608d3.png">

It also features a viewport-responsive layout.

<img width="499" alt="gramstamatic-responsive1" src="https://user-images.githubusercontent.com/42009003/138523853-3aa10604-646d-4b86-8aa1-9e3a61f5949a.png">
<img width="495" alt="gramstamatic-responsive2" src="https://user-images.githubusercontent.com/42009003/138523870-e5d98476-634a-4e4d-a488-3d8de48ae6f7.png">

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

