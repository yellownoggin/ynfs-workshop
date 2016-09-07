namespace ynfsworkshop {

    'use strict';

    angular
        .module('ynfsworkshop')
        .config(configRoutes);

    // configRoutes.$inject['$urlRouterProvider', '$stateProvider'];

    function configRoutes($stateProvider) {

        // $locationProvider.html5Mode(true);


        $stateProvider
            .state('ng1Sandbox', {
                abstract: true,
                views: {
                    shell: {
                        controller: 'SandboxHomeController',
                        controllerAs: 'sc',
                        templateUrl: 'app/ng1-sandbox/layout/ng1-sandbox-shell.html'
                    }
                }
            })
            .state('ng1Sandbox.home', {
                url: '/ng1Sandbox',
                views: {
                    examples: {
                        templateUrl: 'app/ng1-sandbox/home.html'
                    }
                }
            })
            .state('ng1Sandbox.ngmessagesForm', {
                url: '/ngmessages-example',
                views: {
                    examples: {
                        controller: 'MessagesController',
                        controllerAs: 'mc',
                        templateUrl: 'app/ng1-sandbox/examples/ngmessages.html'
                    }
                }
            })
            .state('ng1Sandbox.ngmessagesConfirmation', {
                url: '/ngmessages-example/confirmation',
                views: {
                    examples: {
                        controller: 'MessagesController',
                        controllerAs: 'mc',
                        templateUrl: 'app/ng1-sandbox/examples/ngmessages-confirmation.html'
                    }
                }
            });
    }



    // TODO:  Holding off on style guide's routerHelperProvider
    // come back to see if I needed
    // note: allows to configure states during 1 phase  seemingly main side benefit
}
