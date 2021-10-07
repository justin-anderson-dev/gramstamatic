import { FieldValue, firebase } from '../services/firebase';

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

export async function getUserByUsername(username) {
  const response = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return response.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
};

export async function getUserById(uid) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', uid)
    .get();

  const userData = result.docs.map((item) => ({
    ...item.data(), 
    docId: item.id
  }));

  return userData;
};

export async function getSuggestedProfiles(userId, following) {
  const suggestions = await firebase.firestore().collection('users').limit(10).get();

  return suggestions.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
};

export async function updateFollowers(profileId, newFollowerId, isFollowingProfile = false) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileId)
    .update({
      followers: isFollowingProfile 
        ? FieldValue.arrayRemove(newFollowerId)
        : FieldValue.arrayUnion(newFollowerId)
    });
};

export async function updateFollowing(newFollowerDocId, profileId, isFollowingProfile = false) {
  return firebase
    .firestore()
    .collection('users')
    .doc(newFollowerDocId)
    .update({
      following: isFollowingProfile
      ? FieldValue.arrayRemove(profileId)
      : FieldValue.arrayUnion(profileId)
    });
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
};

export async function getUserPhotosById(userId) {
  const response = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();

    return response.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));
};

export async function updateToggleFollow(isFollowing, followerDocId, profileDocId, profileUserId, followerUserId) {
  await updateFollowing(followerDocId, profileUserId, isFollowing);
  await updateFollowers(profileDocId, followerUserId, isFollowing);
};
