import '../styles/app.css';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from '../utils/firebase';
import * as ROUTES from '../utils/constants/routes';

import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
  const { username } = useParams();
  // TODO: figure out why change in URL param is not triggering re-render of UserProfile component. Username value from useEffect has changed. Shouldn't that trigger a re-render?
  // Something to do with ROUTES - already routed to ROUTES.PROFILE, unlike other cases

  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    document.title = 'Profile - Gramstamatic';
  }, []);

  useEffect(() => {
    async function checkUserExists() {
      const data = await getUserByUsername(username);
      const profile = data[0];
      if (profile?.userId) {
        setUser(profile);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user}/>
      </div>
    </div>
  ) : null;
}
