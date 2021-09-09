import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import '../styles/app.css';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase.js';

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '' || userName === '' || fullName === '';

  const handleSignup = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(userName);

    if (!usernameExists) {
      // console.log('no username here, no sir');
      try {
        const newUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // firebase needs a 'displayName' value for auth
        await newUser.user.updateProfile({
          displayName: userName
        });

        // create firebase user document
        await firebase
          .firestore()
          .collection('users')
          .add({
            userId: newUser.user.uid,
            username: userName.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            followers: [],
            following: ['2'],
            dateCreated: Date.now()
          });

        return history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setUserName('');
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setUserName('');
      setFullName('');
      setEmailAddress('');
      setPassword('');
      setError(`Someone already took that username. Please try another.`);
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Gramm.fans';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-lg items-center h-screen p-1">
      <div className="flex w-3/5">
        <img src="/images/iphone-1.jpg" alt="iPhone with Gramm.Fans profile" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/NewLogoAlpha.png" alt="Instagram logo" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Enter your desired username"
              type="text"
              placeholder="Username"
              value={userName}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUserName(target.value)}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              value={fullName}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              value={emailAddress}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              value={password}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && `opacity-50`
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Have an account already?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
