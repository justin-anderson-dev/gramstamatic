import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../utils/firebase";
import SuggestedProfile from "./suggestedProfile";

export default function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);

  // get suggested profiles using the fireBase service
  useEffect(() => {
    let isMounted = true;
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      if (isMounted) setProfiles(response);
    };

    if (userId) {
      suggestedProfiles();
    }
    
    return () => isMounted = false ;
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={10} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile 
            key={profile.docId}
            suggProfDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
};
