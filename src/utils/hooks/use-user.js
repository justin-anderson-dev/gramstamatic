import { useState, useEffect } from "react";
import { getUserById } from "../firebase";

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    async function getUserDataByUID(userId) {
      // pass UID to firebase service, add response object to state
      const [response] = await getUserById(userId); 
      setActiveUser(response || {});
    }
    if (userId) {
      getUserDataByUID(userId);
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
}
