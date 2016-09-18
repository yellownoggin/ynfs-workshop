var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .service('postService', postService);
    function postService() {
        this.getTimeText = getTimeText;
        function getTimeText(postCreationTimestamp) {
            var millisecond = Date.now() - postCreationTimestamp;
            var ms = millisecond % 1000;
            millisecond = (millisecond - ms) / 1000;
            var seconds = millisecond % 60;
            millisecond = (millisecond - seconds) / 60;
            var minutes = millisecond % 60;
            millisecond = (millisecond - minutes) / 60;
            var hours = millisecond % 24;
            var days = (millisecond - hours) / 24;
            var timeSinceCreation = [days, hours, minutes, seconds, ms];
            var timeText = 'Now';
            if (timeSinceCreation[0] !== 0) {
                timeText = timeSinceCreation[0] + 'd';
            }
            else if (timeSinceCreation[1] !== 0) {
                timeText = timeSinceCreation[1] + 'h';
            }
            else if (timeSinceCreation[2] !== 0) {
                timeText = timeSinceCreation[2] + 'm';
            }
            return timeText;
        }
    }
})(friendlyPix || (friendlyPix = {}));
