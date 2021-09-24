import { useContext } from 'react';
import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';
import UserContext from '../../context/user';

export default function Sidebar() {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);

  return (
    <div className="hidden lg:block p-4">
      <User 
        username={user?.username} 
        fullName={user?.fullName} 
      />
      <Suggestions userId={user.userId} following={user.following} loggedInUserDocId={user.docId}/>
    </div>
  );
};
