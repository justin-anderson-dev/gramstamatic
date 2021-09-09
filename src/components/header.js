import { useContext } from "react";
import { Link } from 'react-router-dom';
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from '../constants/routes';

export default function Header() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  console.log('user -> ', user);

  return (
    <p>I am the Header</p>
  );
}
