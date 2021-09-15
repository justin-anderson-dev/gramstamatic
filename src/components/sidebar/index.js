import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
  const { user } = useUser();
  // console.log(`user --> ${JSON.stringify(user)}`);

  return (
    <div className="md:block p-4 border border-gray-primary">
      <User 
        username={user.username} 
        fullName={user.fullName} 
      />
      <Suggestions userId={user.userId} following={user.following} loggedInUserDocId={user.docId}/>
    </div>
  );
};
