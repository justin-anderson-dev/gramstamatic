import { useState, useEffect, useContext } from "react";
import { getUserById } from "../services/firebase";
import UserContext from "../context/user";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserDataByUID(userId) {
      // pass UID to firebase service, add response object to state
      const [response] = await getUserById(userId); 
      setActiveUser(response || {});
    }
    if (user?.uid) {
      getUserDataByUID(user.uid);
    }
  }, [user]);

  return { user: activeUser };
}
