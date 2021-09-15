import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function SuggestedProfile({ userDocId, username, profileId, userId }) {
  const [followed, setFollowed] = useState(false);

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <Link to={`/p/${username}`}>
        <div className="flex items-center justify-between">
          <img
            className="rounded-full w-8 flex mr-3"
            src={`/images/avatars/${username}.jpg`}
            alt=""
          />
          <p className="font-bold text-sm">{username}</p>
        </div>
      </Link>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={() => console.log(`Now following ${username}!`)}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  userDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}
