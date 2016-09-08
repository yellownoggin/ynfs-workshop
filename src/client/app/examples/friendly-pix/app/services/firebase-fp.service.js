var friendlyPix;
(function (friendlyPix) {
    'use strict';
    var firebaseFpService = (function () {
        function firebaseFpService($firebaseArray, $q, $firebaseAuth, $firebaseObject) {
            this.$firebaseArray = $firebaseArray;
            this.$q = $q;
            this.$firebaseAuth = $firebaseAuth;
            this.$firebaseObject = $firebaseObject;
            this.database = firebase.database();
            this.auth = $firebaseAuth();
            this.user = this.auth.$getAuth();
            this.storage = firebase.storage();
            console.log(this.auth, 'this.auth');
            console.log(this.user, 'this.auth getAuth');
        }
        firebaseFpService.prototype.saveUserData = function (imageUrl, displayName) {
            var user = this.auth.$getAuth();
            if (!displayName) {
                displayName = 'Anonymous';
            }
            var searchFullName = displayName.toLowerCase();
            var searchReversedFullName = displayName.split(' ').reverse().join(' ');
            var updateData = {
                profile_picture: imageUrl,
                full_name: searchFullName,
                _search_index: {
                    fullName: searchFullName,
                    reversed_full_name: searchReversedFullName
                }
            };
            return this.database.ref("people/" + user.uid).update(updateData);
        };
        firebaseFpService.prototype.loadUserProfile = function (uid) {
            return firebase.database().ref().child('people').child(uid);
        };
        firebaseFpService.prototype.uploadNewPic = function (pic, thumb, fileName, text) {
            var _this = this;
            var that = this;
            var picRef = this.storage.ref(this.user.uid + "/full/" + Date.now() + "/" + fileName);
            var metadata = {
                contentType: pic.type
            };
            console.log(metadata, 'metadata');
            var picUploadTask = picRef.put(pic, metadata).then(function (snapshot) {
                console.log('New pickup loaded. Size: ', snapshot.totalBytes, 'bytes.');
                var url = snapshot.metadata.downloadURLs[0];
                console.log('File available at', url);
                return url;
            }).catch(function (error) {
                console.error('Error while uploading to pic', error);
            });
            var thumbRef = this.storage.ref(this.user.uid + "/thumb/" + Date.now() + "/" + fileName);
            var thumbUploadTask = thumbRef.put(thumb, metadata).then(function (snapshot) {
                var url = snapshot.metadata.downloadURLs[0];
                console.log('File available at', url);
                return url;
            }).catch(function (error) {
                console.error('Error while uploading new thumb', error);
            });
            return this.$q.all([picUploadTask, thumbUploadTask]).then(function (urls) {
                var newPostKey = _this.database.ref('/posts').push().key;
                var update = {};
                update[("/posts/" + newPostKey)] = {
                    full_url: urls[0],
                    thumb_url: urls[1],
                    text: text,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    full_storage_uri: picRef.toString(),
                    thumb_storage_uri: thumbRef.toString(),
                    author: {
                        uid: that.user.uid,
                        full_name: _this.user.displayName,
                        profile_picture: _this.user.photoURL
                    }
                };
                update[("/people/" + that.user.uid + "/posts/" + newPostKey)] = true;
                update[("/feed/" + that.user.uid + "/" + newPostKey)] = true;
                return _this.database.ref().update(update).then(function () { return newPostKey; });
            });
        };
        return firebaseFpService;
    }());
    friendlyPix.firebaseFpService = firebaseFpService;
    angular
        .module('friendlyPix')
        .service('firebaseFpService', firebaseFpService);
})(friendlyPix || (friendlyPix = {}));
