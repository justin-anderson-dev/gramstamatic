import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileHeader from './header';
import Photos from './photos';
import { getUserPhotosById } from '../../services/firebase';

export default function UserProfile({ user }) {
  const [profile, setProfile] = useState(user);
  const [photosCollection, setPhotosCollection] = useState([]);
  const [followerCount, setFollowerCount] = useState(user.followers.length);

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosById(user.userId);
      setPhotosCollection(photos);
    }
    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <div>
      <ProfileHeader 
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={setFollowerCount}
      />
      <Photos photos={photosCollection} />
    </div>
  )
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};
