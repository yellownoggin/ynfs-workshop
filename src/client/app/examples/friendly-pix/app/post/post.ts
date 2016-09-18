namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .service('postService', postService);

    function postService() {

        this.getTimeText = getTimeText;


        ////////// Service methods

        /**
           * Given the time of creation of a post returns how long since the creation of the post in text
           * format. e.g. 5d, 10h, now...
           * uses static(not sure how to do  that)
           */
        function getTimeText(postCreationTimestamp) {

            // the % takes the decimals out of the equation and is essentially rounding the time incrementally down
            let millisecond = Date.now() - postCreationTimestamp;
            const ms = millisecond % 1000;
            // converts in value to seconds
            millisecond = (millisecond - ms) / 1000;
            const seconds = millisecond % 60;
            millisecond = (millisecond - seconds) / 60;
            const minutes = millisecond % 60;
            millisecond = (millisecond - minutes) / 60;
            const hours = millisecond  % 24;
            const days = (millisecond- hours) / 24;
            var timeSinceCreation = [days, hours, minutes, seconds, ms];

            let timeText = 'Now';
            if (timeSinceCreation[0] !== 0) {
                timeText = timeSinceCreation[0] + 'd';
            } else if (timeSinceCreation[1] !== 0) {
                timeText = timeSinceCreation[1] + 'h';
            } else if (timeSinceCreation[2] !== 0) {
                timeText = timeSinceCreation[2] + 'm';
            }
            return timeText;

        }
    }
}
