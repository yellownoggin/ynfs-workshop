var ynfsworkshop;
(function (ynfsworkshop) {
    'use strict';
    angular
        .module('ynfsworkshop')
        .config(configRoutes);
    function configRoutes($stateProvider) {
        $stateProvider
            .state('ng1Sandbox', {
            url: '/ng1Sandbox',
            controller: 'Ng1SandboxController',
            controllerAs: 'nc',
            views: {
                shell: {
                    templateUrl: 'app/ng1-sandbox/ng1-sandbox-shell.html',
                }
            }
        });
    }
})(ynfsworkshop || (ynfsworkshop = {}));
