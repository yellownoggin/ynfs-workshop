namespace friendlyPix {
    'use strict';

    // A Friendly-pix service that works with the firebase real-time database

    // TODO:  remember $firebaseRefProvider (set up objectProvider?service)

    export class firebaseFpService {
        database: any;
        auth: any;
        user: any;
        storage: any;
        firebaseRefs: any;


        constructor(private $firebaseArray, private $q: ng.IQService, private $firebaseAuth, private $firebaseObject) {
            this.database = firebase.database();
            this.auth = $firebaseAuth();
            this.user = $firebaseAuth().$getAuth();
            this.storage = firebase.storage();

            console.log(this.auth, 'this.auth');
            console.log(this.user, 'this.auth getAuthuid');


            // Firebase references that are listened to.
            this.firebaseRefs = [];

            this.auth.$onAuthStateChanged(function(firebaseUser) {
                if (firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                } else {
                    console.log("Signed out");
                }
            });
        }





        /**
         * Number of posts loaded initially and per page for the feeds.
         * @return {number}
         */
        static POSTS_PAGE_SIZE = 5;




        saveUserData(imageUrl, displayName) {
            let user = this.auth.$getAuth();
            if (!displayName) {
                displayName = 'Anonymous';
            }
            let searchFullName = displayName.toLowerCase();
            let searchReversedFullName = displayName.split(' ').reverse().join(' ');
            //  try {
            //  latinize here in demo
            //   using filter can 50 filtering controller?
            // or here
            //  }

            const updateData = {
                profile_picture: imageUrl,
                full_name: searchFullName,
                _search_index: {
                    fullName: searchFullName,
                    reversed_full_name: searchReversedFullName
                }
            };

            // TODO:
            // 1. why is there a return  here?
            // it works without it I checked
            //  possible stack overflow
            // 2. login issue still
            // - I think
            return this.database.ref(`people/${user.uid}`).update(updateData);
        }


        /**
          * Load a single user profile information
          */
        loadUserProfile(uid) {
            return firebase.database().ref().child('people').child(uid);

        }


        uploadNewPic(pic, thumb, fileName, text) {
            // Start the pic file upload to firebase storage=
            // this.storage = firebase.storage();

            // TODO: jamie can't read currentuser auth
            // getting user information is getting confusing - need to make sense of it



            // var picRef = this.storage.ref(`${this.user.uid}/full/${Date.now()}/${fileName}`);
            // console.log(this.user);
            var that = this;
            //
            var picRef = this.storage.ref(`${this.user.uid}/full/${Date.now()}/${fileName}`);
            var metadata = {
                contentType: pic.type
            };
            console.log(metadata, 'metadata');
            var picUploadTask = picRef.put(pic, metadata).then(snapshot => {


                console.log('New pickup loaded. Size: ', snapshot.totalBytes, 'bytes.');
                var url = snapshot.metadata.downloadURLs[0];
                console.log('File available at', url);
                return url;
            }).catch(error => {
                console.error('Error while uploading to pic', error);
            });

            // Start the thumb file upload to Firebase Storage.
            var thumbRef = this.storage.ref(`${this.user.uid}/thumb/${Date.now()}/${fileName}`);
            var thumbUploadTask = thumbRef.put(thumb, metadata).then(snapshot => {
                var url = snapshot.metadata.downloadURLs[0];
                console.log('File available at', url);
                return url;
            }).catch(error => {
                console.error('Error while uploading new thumb', error)
            });


            // TODO:  good example of a promise to understand
            return this.$q.all([picUploadTask, thumbUploadTask]).then(urls => {
                // Once both pics and thumbnails has been uploaded  add a new post in the firebase database and 2 it's fanned out posts lists(users post and home posts)

                var newPostKey = this.database.ref('/posts').push().key;
                var update = {};

                update[`/posts/${newPostKey}`] = {
                    full_url: urls[0],
                    thumb_url: urls[1],
                    text: text,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    full_storage_uri: picRef.toString(),
                    thumb_storage_uri: thumbRef.toString(),
                    author: {
                        uid: that.user.uid,
                        full_name: this.user.displayName,
                        profile_picture: this.user.photoURL
                    }
                };

                update[`/people/${that.user.uid}/posts/${newPostKey}`] = true;

                update[`/feed/${that.user.uid}/${newPostKey}`] = true;
                // TODO: this did not work and threm an error - it was an error permission denied. The path was copy/syntax error from the source code translation from me. The reason it was denied - is the structure/architecture of the rules did/ inidicate a path with a posts. it goes feed>uid>postId> then rule. If you see peoples arch it has uid>posts>$postId SO beware of how the rules are formed and the update url
                // update[`/feed/${that.user.uid}/posts/${newPostKey}`] = true;
                return this.database.ref().update(update).then(() => newPostKey);

            });


        }


        /**
          * Subscribes to receive updates to the home feed. The given `callback` function gets called for
          * each new post to the general post feed.
          *
          * If provided we'll only listen to posts that were posted after `latestPostId`.
          */
        subscribeToHomeFeed(callback, latestPostId) {
            return this._subscribeToFeed(`/feed/${this.user.uid}`, callback, latestPostId,
                true);
        }


        /**
  * Subscribes to receive updates to the given feed. The given `callback` function gets called
  * for each new entry on the given feed.
  *
  * If provided we'll only listen to entries that were posted after `latestEntryId`. This allows to
  * listen only for new feed entries after fetching existing entries using `_getPaginatedFeed()`.
  *
  * If needed the posts details can be fetched. This is useful for shallow post feeds.
  * @private
  */
 _subscribeToFeed(uri, callback, latestEntryId = null, fetchPostDetails = false) {
   // Load all posts information.
   let feedRef = this.database.ref(uri);
   if (latestEntryId) {
     feedRef = feedRef.orderByKey().startAt(latestEntryId);
   }
   feedRef.on('child_added', feedData => {
     if (feedData.key !== latestEntryId) {
       if (!fetchPostDetails) {
         callback(feedData.key, feedData.val());
       } else {
         this.database.ref(`/posts/${feedData.key}`).once('value').then(
             postData => callback(postData.key, postData.val()));
       }
     }
   });
   this.firebaseRefs.push(feedRef);
 }



        /**
          * Paginates posts from the user's home feed.
          *
          * Fetches a page of `POSTS_PAGE_SIZE` posts from the user's home feed.
          *
          * We return a `Promise` which resolves with an Map of posts and a function to the next page or
          * `null` if there is no neuxt page.
          */

        getHomeFeedPosts() {

            return this._getPaginatedFeed(`/feed/${this.user.uid}`,
                firebaseFpService.POSTS_PAGE_SIZE, null, true);
        }


        /**
   * Updates the home feed with new followed users' posts and returns a promise once that's done.
   */
        updateHomeFeeds() {
            // Make sure we listen on each followed people's posts.
            const followingRef = this.database.ref(`/people/${this.user.uid}/following`);
            return followingRef.once('value', followingData => {
                // Start listening the followed user's posts to populate the home feed.
                const following = followingData.val();
                if (!following) {
                    console.log('You are following nobody');
                    return;
                }
                const updateOperations = Object.keys(following).map(followedUid => {
                    let followedUserPostsRef = this.database.ref(`/people/${followedUid}/posts`);
                    const lastSyncedPostId = following[followedUid];
                    if (lastSyncedPostId instanceof String) {
                        followedUserPostsRef = followedUserPostsRef.orderByKey().startAt(lastSyncedPostId);
                    }
                    return followedUserPostsRef.once('value', postData => {
                        const updates = {};
                        if (!postData.val()) {
                            return;
                        }
                        Object.keys(postData.val()).forEach(postId => {
                            if (postId !== lastSyncedPostId) {
                                updates[`/feed/${this.auth.user.uid}/${postId}`] = true;
                                updates[`/people/${this.user.uid}/following/${followedUid}`] = postId;
                            }
                        });
                        return this.database.ref().update(updates);
                    });
                });
                return this.$q.all(updateOperations);
            });
        }

        /**
      * Paginates entries from the given feed.
      *
      * Fetches a page of `pageSize` entries from the given feed.
      *
      * If provided we'll return entries that were posted before (and including) `earliestEntryId`.
      *
      * We return a `Promise` which resolves with an Map of entries and a function to the next page or
      * `null` if there is no next page.
      *
      * If needed the posts details can be fetched. This is useful for shallow post feeds like the user
      * home feed and the user post feed.
      * @private
      */
        private _getPaginatedFeed(uri, pageSize, earliestEntryId = null, fetchPostDetails = false) {
            console.log('Fetching entries from', uri, 'start at', earliestEntryId, 'page size', pageSize);
            let ref = this.database.ref(uri);
            if (earliestEntryId) {
                ref = ref.orderByKey().endAt(earliestEntryId);
            }
            // We're fetching an additional item as a cheap way to test if there is a next page.
            return ref.limitToLast(pageSize + 1).once('value').then(data => {
                const entries = data.val() || {};
                console.log(entries, 'entries in paginated feed');
                // Figure out if there is a next page.
                let nextPage = null;
                const entryIds = Object.keys(entries);
                if (entryIds.length > pageSize) {
                    delete entries[entryIds[0]];
                    const nextPageStartingId = entryIds.shift();
                    nextPage = () => this._getPaginatedFeed(
                        uri, pageSize, nextPageStartingId, fetchPostDetails);
                }
                if (fetchPostDetails) {
                    // Fetch details of all posts.
                    const queries = entryIds.map(postId => this.getPostData(postId));
                    // Since all the requests are being done one the same feed it's unlikely that a single one
                    // would fail and not the others so using Promise.all() is not so risky.
                    return this.$q.all(queries).then(results => {
                        const deleteOps = [];
                        results.forEach(result => {
                            if (result.val()) {
                                entries[result.key] = result.val();
                            } else {
                                // We encountered a deleted post. Removing permanently from the feed.
                                delete entries[result.key];
                                deleteOps.push(this.deleteFromFeed(uri, result.key));
                            }
                        });
                        if (deleteOps.length > 0) {
                            // We had to remove some deleted posts from the feed. Lets run the query again to get
                            // the correct number of posts.

                            return this._getPaginatedFeed(uri, pageSize, earliestEntryId, fetchPostDetails);
                        }
                        return { entries: entries, nextPage: nextPage };
                    });
                }
                return { entries: entries, nextPage: nextPage };
            });
        }


        /**
        * Fetches a single post data.
        */
        getPostData(postId) {
            return this.database.ref(`/posts/${postId}`).once('value');
        }

        /**
          * Deletes the given postId entry from the user's home feed.
          */
        deleteFromFeed(uri, postId) {
            return this.database.ref(`${uri}/${postId}`).remove();
        }


    }

    angular
        .module('friendlyPix')
        .service('firebaseFpService', firebaseFpService);

}
