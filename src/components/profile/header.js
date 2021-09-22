/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Skeleton from "react-loading-skeleton";

export default function ProfileHeader({ photosCount, profile, followerCount, setFollowerCount }) {
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  return <p>{profile.fullName}&apos;s Profile</p>;
}

ProfileHeader.propTypes = {
  photosCount: PropTypes.number,
  followerCount: PropTypes.number,
  setFollowerCount: PropTypes.func,
  profile: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};
