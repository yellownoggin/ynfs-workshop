var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .service('feedService', feedService);
    function feedService(firebaseFpService, $firebaseAuth, $q) {
        this.showHomeFeed = showHomeFeed;
        this.user = $firebaseAuth().$getAuth();
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
    }
})(friendlyPix || (friendlyPix = {}));
