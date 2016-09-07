namespace friendlyPix {
    'use strict';

    // A Friendly-pix service that works with the firebase real-time database

    // TODO:  remember $firebaseRefProvider (set up objectProvider?service)

    export class firebaseFpService {
        database: any;
        auth: any;
        user: any;
        storage: any;


        constructor(private $firebaseArray, private $q: ng.IQService, private Auth, private $firebaseObject) {
            this.database = firebase.database();
            this.auth = Auth;
            this.user = this.auth.$getAuth();
            this.storage = firebase.storage();

            console.log(this.Auth, 'this.auth');
            console.log(this.user, 'this.auth getAuth');
        }


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



            // var picRef = this.storage.ref(`${this.auth.currentUser.uid}/full/${Date.now()}/${fileName}`);
            // console.log(this.user);
            var that  = this;
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


    }

    angular
        .module('friendlyPix')
        .service('firebaseFpService', firebaseFpService);

}
