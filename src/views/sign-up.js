import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import '../styles/app.css';
import * as ROUTES from '../utils/constants/routes';
import { doesUsernameExist } from '../utils/firebase.js';

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
            following: [],
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
    document.title = 'Sign Up - Gramstamatic';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen px-4 lg:px-0">
      <div className="hidden lg:flex w-full lg:w-3/5">
        <img 
          src="/images/iphone-1.jpg" 
          alt="iPhone with Gramstamatic profile" 
          className="object-scale-down"  
        />
      </div>
      <div className="flex flex-col w-full lg:w-2/5 justify-center h-full max-w-md m-auto">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/new-NewLogoAlpha.png" alt="Gramstamatic logo" className="mt-2 mb-4 object-scale-down" />
          </h1>
          <h3 className="text-sm justify-center w-64 mb-4">
            Share photos with friends -- <em>without</em> giving all your data to Zuckerberg!
          </h3>

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
