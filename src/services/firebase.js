/* eslint-disable import/prefer-default-export */
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
