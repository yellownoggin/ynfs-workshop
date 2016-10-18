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
        });
    }
})(ynfsworkshop || (ynfsworkshop = {}));
