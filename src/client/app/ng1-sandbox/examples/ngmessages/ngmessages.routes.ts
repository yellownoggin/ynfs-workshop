namespace ynfsworkshop {
    'use strict';

    angular
        .module('ynfsworkshop')
        .config(initRoutes);

    function initRoutes($stateProvider) {

        $stateProvider
            .state('ng1Sandbox.ngmessagesForm', {
                url: '/ngmessages-example',
                views: {
                    examples: {
                        controller: 'MessagesController',
                        controllerAs: 'mc',
                        templateUrl: 'app/ng1-sandbox/examples/ngmessages/ngmessages.html'
                    }
                }
            })
            .state('ng1Sandbox.ngmessagesConfirmation', {
                url: '/ngmessages-example/confirmation',
                views: {
                    examples: {
                        controller: 'MessagesController',
                        controllerAs: 'mc',
                        templateUrl: 'app/ng1-sandbox/examples/ngmessages/ngmessages-confirmation.html'
                    }
                }
            });

    }


}
