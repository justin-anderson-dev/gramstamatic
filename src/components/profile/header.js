/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import UserContext from "../../context/user";
import { updateToggleFollow } from "../../services/firebase";

export default function ProfileHeader({ 
  photosCount, 
  followerCount, 
  setFollowerCount, 
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName: profileFullName,
    followers: profileFollowers,
    following: profileFollowing,
    username: profileUsername
  } 
}) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeFollowBtn = user?.username && user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount(isFollowingProfile ? followerCount - 1 : followerCount + 1);
    await updateToggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
  };

  useEffect(() =>{
    setIsFollowingProfile(user.following?.includes(profileUserId));  
  }, [user.userId, user.following, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername ? (
          <img 
            className="rounded-full h-16 w-16 md:h-20 lg:h-40 md:w-20 lg:w-40 flex"
            alt={`${profileUsername} profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}  
          />
        ) : (
          <img 
            className="rounded-full h-16 w-16 md:h-20 lg:h-40 md:w-20 lg:w-40 flex"
            alt={`generic profile picture`}
            src={`/images/avatars/Generic-Profile-1600x1600.png/`}  
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeFollowBtn && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleFollow()
                }
              }}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4 flex-col lg:flex-row">
          {!profileFollowers || !profileFollowing ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profileFollowing.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">{!profileFullName ? <Skeleton count={1} height={24} /> : profileFullName}</p>
        </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  photosCount: PropTypes.number,
  followerCount: PropTypes.number,
  setFollowerCount: PropTypes.func,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array
  }).isRequired
};
