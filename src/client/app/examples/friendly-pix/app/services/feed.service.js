var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .service('feedService', feedService);
    function feedService(firebaseFpService, $firebaseAuth, $q) {
        this.showHomeFeed = showHomeFeed;
        this.showGeneralFeed = showGeneralFeed;
        this.user = $firebaseAuth().$getAuth();
        this.newPosts = {};
        this.newPostsButtonText = 'Display ${Object.keys(this.newPosts).length} new posts';
        this.addNewPost = addNewPost;
        function showHomeFeed() {
            var _this = this;
            var entries = undefined;
            if (this.user) {
                return firebaseFpService.updateHomeFeeds().then(function () {
                    var deferred = $q.defer();
                    return firebaseFpService.getHomeFeedPosts().then(function (data) {
                        var postIds = Object.keys(data.entries);
                        if (postIds.length === 0) {
                            console.log('There are no posts.');
                        }
                        var latestPostId = postIds[postIds.length - 1];
                        firebaseFpService.subscribeToHomeFeed(function (postId, postValue) {
                            _this.addNewPost(postId, postValue);
                        }, latestPostId);
                        entries = data.entries;
                        deferred.resolve(entries);
                        return deferred.promise;
                    });
                });
            }
        }
        function showGeneralFeed() {
            var _this = this;
            var deferred = $q.defer();
            firebaseFpService.getPosts().then(function (data) {
                var latestPostId = Object.keys(data.entries)[Object.keys(data.entries).length - 1];
                firebaseFpService.subscribeToGeneralFeed(function (postId, postValue) { return _this.addNewPost(postId, postValue); }, latestPostId);
                deferred.resolve(data.entries);
            });
            return deferred.promise;
        }
        function addNewPost(postId, postValue) {
            this.newPosts[postId] = postValue;
            this.newPostsButtonText = 'Display' + Object.keys(this.newPosts).length + 'new posts fred';
            this.newPostsButtonShow = true;
        }
    }
})(friendlyPix || (friendlyPix = {}));
