namespace ynfsworkshop {

    'use strict';

    angular
        .module('ynfsworkshop')
        .config(configRoutes);

    // configRoutes.$inject['$urlRouterProvider', '$stateProvider'];

    function configRoutes($urlRouterProvider, $stateProvider) {

        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingController',
                controllerAs: 'lc',
                views: {
                    shell: {
                        templateUrl: 'app/landing/landing.html',
                    }
                }
            });
    }



    // TODO:  Holding off on style guide's routerHelperProvider
    // come back to see if I needed
    // note: allows to configure states during 1 phase  seemingly main side benefit
}
