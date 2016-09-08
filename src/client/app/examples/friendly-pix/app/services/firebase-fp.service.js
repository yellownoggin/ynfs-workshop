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
            this.user = $firebaseAuth().$getAuth();
            this.storage = firebase.storage();
            console.log(this.auth, 'this.auth');
            console.log(this.user, 'this.auth getAuthuid');
            this.firebaseRefs = [];
            this.auth.$onAuthStateChanged(function (firebaseUser) {
                if (firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                }
                else {
                    console.log("Signed out");
                }
            });
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
        firebaseFpService.prototype.subscribeToHomeFeed = function (callback, latestPostId) {
            return this._subscribeToFeed("/feed/" + this.user.uid, callback, latestPostId, true);
        };
        firebaseFpService.prototype._subscribeToFeed = function (uri, callback, latestEntryId, fetchPostDetails) {
            var _this = this;
            if (latestEntryId === void 0) { latestEntryId = null; }
            if (fetchPostDetails === void 0) { fetchPostDetails = false; }
            var feedRef = this.database.ref(uri);
            if (latestEntryId) {
                feedRef = feedRef.orderByKey().startAt(latestEntryId);
            }
            feedRef.on('child_added', function (feedData) {
                if (feedData.key !== latestEntryId) {
                    if (!fetchPostDetails) {
                        callback(feedData.key, feedData.val());
                    }
                    else {
                        _this.database.ref("/posts/" + feedData.key).once('value').then(function (postData) { return callback(postData.key, postData.val()); });
                    }
                }
            });
            this.firebaseRefs.push(feedRef);
        };
        firebaseFpService.prototype.getHomeFeedPosts = function () {
            return this._getPaginatedFeed("/feed/" + this.user.uid, firebaseFpService.POSTS_PAGE_SIZE, null, true);
        };
        firebaseFpService.prototype.updateHomeFeeds = function () {
            var _this = this;
            var followingRef = this.database.ref("/people/" + this.user.uid + "/following");
            return followingRef.once('value', function (followingData) {
                var following = followingData.val();
                if (!following) {
                    console.log('You are following nobody');
                    return;
                }
                var updateOperations = Object.keys(following).map(function (followedUid) {
                    var followedUserPostsRef = _this.database.ref("/people/" + followedUid + "/posts");
                    var lastSyncedPostId = following[followedUid];
                    if (lastSyncedPostId instanceof String) {
                        followedUserPostsRef = followedUserPostsRef.orderByKey().startAt(lastSyncedPostId);
                    }
                    return followedUserPostsRef.once('value', function (postData) {
                        var updates = {};
                        if (!postData.val()) {
                            return;
                        }
                        Object.keys(postData.val()).forEach(function (postId) {
                            if (postId !== lastSyncedPostId) {
                                updates[("/feed/" + _this.auth.user.uid + "/" + postId)] = true;
                                updates[("/people/" + _this.user.uid + "/following/" + followedUid)] = postId;
                            }
                        });
                        return _this.database.ref().update(updates);
                    });
                });
                return _this.$q.all(updateOperations);
            });
        };
        firebaseFpService.prototype._getPaginatedFeed = function (uri, pageSize, earliestEntryId, fetchPostDetails) {
            var _this = this;
            if (earliestEntryId === void 0) { earliestEntryId = null; }
            if (fetchPostDetails === void 0) { fetchPostDetails = false; }
            console.log('Fetching entries from', uri, 'start at', earliestEntryId, 'page size', pageSize);
            var ref = this.database.ref(uri);
            if (earliestEntryId) {
                ref = ref.orderByKey().endAt(earliestEntryId);
            }
            return ref.limitToLast(pageSize + 1).once('value').then(function (data) {
                var entries = data.val() || {};
                console.log(entries, 'entries in paginated feed');
                var nextPage = null;
                var entryIds = Object.keys(entries);
                if (entryIds.length > pageSize) {
                    delete entries[entryIds[0]];
                    var nextPageStartingId_1 = entryIds.shift();
                    nextPage = function () { return _this._getPaginatedFeed(uri, pageSize, nextPageStartingId_1, fetchPostDetails); };
                }
                if (fetchPostDetails) {
                    var queries = entryIds.map(function (postId) { return _this.getPostData(postId); });
                    return _this.$q.all(queries).then(function (results) {
                        var deleteOps = [];
                        results.forEach(function (result) {
                            if (result.val()) {
                                entries[result.key] = result.val();
                            }
                            else {
                                delete entries[result.key];
                                deleteOps.push(_this.deleteFromFeed(uri, result.key));
                            }
                        });
                        if (deleteOps.length > 0) {
                            return _this._getPaginatedFeed(uri, pageSize, earliestEntryId, fetchPostDetails);
                        }
                        return { entries: entries, nextPage: nextPage };
                    });
                }
                return { entries: entries, nextPage: nextPage };
            });
        };
        firebaseFpService.prototype.getPostData = function (postId) {
            return this.database.ref("/posts/" + postId).once('value');
        };
        firebaseFpService.prototype.deleteFromFeed = function (uri, postId) {
            return this.database.ref(uri + "/" + postId).remove();
        };
        firebaseFpService.POSTS_PAGE_SIZE = 5;
        return firebaseFpService;
    }());
    friendlyPix.firebaseFpService = firebaseFpService;
    angular
        .module('friendlyPix')
        .service('firebaseFpService', firebaseFpService);
})(friendlyPix || (friendlyPix = {}));
