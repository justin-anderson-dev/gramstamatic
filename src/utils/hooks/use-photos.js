import { useState, useEffect} from 'react';
import { getPhotos, getUserById } from '../firebase';

export default function usePhotos(loggedInUser) {
  const [photos, setPhotos] = useState(null);
  // const user = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const userData = await getUserById(loggedInUser?.uid);
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
