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

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserById(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}
