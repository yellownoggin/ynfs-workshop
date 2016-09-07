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
            url: '/ng1Sandbox',
            views: {
                shell: {
                    templateUrl: 'app/ng1-sandbox/layout/ng1-sandbox-shell.html'
                }
            }
        })
            .state('ng1Sandbox.ngmessages', {
            abstract: true,
            url: '/ngmessages',
            views: {
                examples: {
                    controller: 'MessagesController',
                    controllerAs: 'mc',
                    templateUrl: 'app/ng1-sandbox/examples/ngmessages.html'
                }
            }
        })
            .state('ng1Sandbox.ngmessages.form', {
            url: '/forms',
            views: {
                examples: {
                    controller: 'MessagesController',
                    controllerAs: 'mc',
                    templateUrl: 'app/ng1-sandbox/examples/ngmessages.html'
                }
            }
        })
            .state('ng1Sandbox.ngmessages.confirmation', {
            url: '/confirmation',
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
