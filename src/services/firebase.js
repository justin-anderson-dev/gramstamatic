import { FieldValue, firebase } from '../lib/firebase';

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
};

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
};

export async function getSuggestedProfiles(userId, following) {
  const suggestions = await firebase.firestore().collection('users').limit(10).get();

  return suggestions.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
};

export async function addFollower(docId, newFollowerId) {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({followers: FieldValue.arrayUnion(newFollowerId)})
};

export async function addFollowing(newFollowerDocId, profileId) {
  return firebase
    .firestore()
    .collection('users')
    .doc(newFollowerDocId)
    .update({following: FieldValue.arrayUnion(profileId)});
};
