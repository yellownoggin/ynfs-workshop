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



    // TODO:  Holding off on style guide's routerHelperProvider
    // come back to see if I needed
    // note: allows to configure states during 1 phase  seemingly main side benefit
}
