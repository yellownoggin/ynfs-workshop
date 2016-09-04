var ynfsworkshop;
(function (ynfsworkshop) {
    'use strict';
    angular
        .module('ynfsworkshop')
        .controller('LandingController', LandingController);
    function LandingController(logger) {
        initialize();
        function initialize() {
            logger.success('Landing Controller loaded', null);
        }
    }
})(ynfsworkshop || (ynfsworkshop = {}));
