namespace ynfsworkshop {
    'use strict';

    angular
        .module('ynfsworkshop')
        .controller('LandingController', LandingController);

    // Todo: nginject
    //
    function LandingController(logger) {

        initialize();


        function initialize() {
            logger.success('Landing Controller loaded', null);
        }



    }
}
