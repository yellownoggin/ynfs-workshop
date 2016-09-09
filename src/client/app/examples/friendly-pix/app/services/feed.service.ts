namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .service('feedService', feedService);

    function feedService(firebaseFpService, $firebaseAuth, $q) {

        this.showHomeFeed = showHomeFeed;
        this.user = $firebaseAuth().$getAuth();

        //////////// Service methods


        /**
        * Shows the feed showing all followed users.
        */
        function showHomeFeed() {
            // Clear previously displayed posts if any.
            // this.clear();

            var entries = undefined;

            if (this.user) {
                // Make sure the home feed is updated with followed users's new posts.
            return firebaseFpService.updateHomeFeeds().then(() => {

                    var deferred = $q.defer();

                    // Load initial batch of posts.
                return firebaseFpService.getHomeFeedPosts().then(data => {

                        const postIds = Object.keys(data.entries);
                        if (postIds.length === 0) {
                            // TODO: need the add a show element with a value to use here
                            // this.noPostsMessage.fadeIn();
                            console.log('There are no posts.');
                        }
                        // Listen for new posts.
                        const latestPostId = postIds[postIds.length - 1];
                        // firebaseFpService.subscribeToHomeFeed(
                        //     (postId, postValue) => {
                        //         this.addNewPost(postId, postValue);
                        //     }, latestPostId);

                        // Adds fetched posts and next page button if necessary.
                        // this.addPosts(data.entries);
                        // this.toggleNextPageButton(data.nextPage);


                        // Jamie's addition of promise arch. Demo sends to a object that inserts into jquery elements - this is a angular variation
                        // TODO: error check
                        // resource: https://appendto.com/2016/02/working-promises-angularjs-services/

                        entries = data.entries;
                        deferred.resolve(entries);
                        return deferred.promise;

                        // Note: can not get when() construct to work
                        // TODO: stackoverflow

                        // console.log(deferred, 'deferred');
                        // console.log(entries, 'below deferred');

                        });




                    //    // Add new posts from followers live.
                    //    firebaseFpService.startHomeFeedLiveUpdaters();
                    //
                    //    // Listen for posts deletions.
                    //    firebaseFpService.registePostsDeletion(postId => this.onPostDeleted(postId));
                });

            }
            // return $q.when(entries, function(a) {
            //     console.log('entries is ready', a);
            // });

        }

        /**
 * Appends the given list of `posts`.
 */
        // function addPosts(posts) {
        //   // Displays the list of posts
        //   const postIds = Object.keys(posts);
        //   for (let i = postIds.length - 1; i >= 0; i--) {
        //     this.noPostsMessage.hide();
        //     const postData = posts[postIds[i]];
        //     const post = new friendlyPix.Post();
        //     this.posts.push(post);
        //     const postElement = post.fillPostData(postIds[i], postData.thumb_url || postData.url,
        //         postData.text, postData.author, postData.timestamp, null, null, postData.full_url);
        //     // If a post with similar ID is already in the feed we replace it instead of appending.
        //     const existingPostElement = $(`.fp-post-${postIds[i]}`, this.feedImageContainer);
        //     if (existingPostElement.length) {
        //       existingPostElement.replaceWith(postElement);
        //     } else {
        //       this.feedImageContainer.append(postElement.addClass(`fp-post-${postIds[i]}`));
        //     }
        //   }
        // }

        /**
         * Shows the "load next page" button and binds it the `nextPage` callback. If `nextPage` is `null`
         * then the button is hidden.
         */
        // function toggleNextPageButton(nextPage) {
        //   this.nextPageButton.unbind('click');
        //   if (nextPage) {
        //     const loadMorePosts = () => {
        //       this.nextPageButton.prop('disabled', true);
        //       console.log('Loading next page of posts.');
        //       nextPage().then(data => {
        //         this.addPosts(data.entries);
        //         this.toggleNextPageButton(data.nextPage);
        //       });
        //     };
        //     this.nextPageButton.show();
        //     // Enable infinite Scroll.
        //     friendlyPix.MaterialUtils.onEndScroll(100).then(loadMorePosts);
        //     this.nextPageButton.prop('disabled', false);
        //     this.nextPageButton.click(loadMorePosts);
        //   } else {
        //     this.nextPageButton.hide();
        //   }
        // }



    }
}
