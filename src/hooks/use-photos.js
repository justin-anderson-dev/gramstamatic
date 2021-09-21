// TODO: write custom hook
import { useState, useEffect, useContext } from 'react';
import { getPhotos, getUserById } from '../services/firebase';
import UserContext from '../context/user';

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = ''}
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserById(userId);
      let followedUserPhotos = [];
      
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
    getTimelinePhotos();
  }, [userId]);

  return { photos };
}
