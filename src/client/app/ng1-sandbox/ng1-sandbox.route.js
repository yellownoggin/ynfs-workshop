var ynfsworkshop;
(function (ynfsworkshop) {
    'use strict';
    angular
        .module('ynfsworkshop')
        .config(configRoutes);
    function configRoutes($stateProvider) {
        $stateProvider
            .state('ng1Sandbox', {
            abstract: true,
            views: {
                shell: {
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
})(ynfsworkshop || (ynfsworkshop = {}));
