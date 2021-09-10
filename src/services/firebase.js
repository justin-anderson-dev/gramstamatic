import { firebase } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  if (result.docs) {
    return result.docs.length > 0;
  }
  return false;
}

export async function getUserById(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(), 
    docId: item.id
  }));

  return user;
}
