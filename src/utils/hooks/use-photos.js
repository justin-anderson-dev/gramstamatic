import { useState, useEffect} from 'react';
import { getPhotos, getUserById } from '../firebase';

// what I want to pass to this function is the userId and the list of 'following' so the component re-renders if that changes (i.e. when I follow someone)

export default function usePhotos(loggedInUser) {
  const [photos, setPhotos] = useState(null);
  // const user = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      console.log('user argument-> ', loggedInUser);
      // need to get user data
      const userData = await getUserById(loggedInUser?.uid);
      console.log('userData -> ', userData[0])
      const user = userData[0];
      
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);
        
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }
    getTimelinePhotos();
  }, [loggedInUser]);

  return { photos };
}
