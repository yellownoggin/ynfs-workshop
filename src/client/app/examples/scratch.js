/**
 * Listens to updates on the user's posts and calls the callback with user posts counts.
 */
 // firebaseservice
registerForPostsCount(uid, postsCallback) {


    // get & store current uid's (stateParams) posts
  const userPostsRef = this.database.ref(`/people/${uid}/posts`);

  // on value event call the callback provided with the
  // which is given the # of children in the data (# of post);
  // numChildren(): Gets the number of children for this DataSnapshot.
  userPostsRef.on('value', data => postsCallback(data.numChildren()));
  this.firebaseRefs.push(userPostsRef);
}


userservice
  loadUser(userId) {
// Lod user's number of posts.
friendlyPix.firebase.registerForPostsCount(userId,
    nbPosts => this.nbPostsContainer.text(nbPosts));
