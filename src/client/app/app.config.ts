/* global toastr:false */
namespace ynfsworkshop {
    'use strict';

    angular
        .module('ynfsworkshop')
        .config(configureDebugging)
        .config(initTheme)
        .constant('toastr', toastr);

    /**
     * Toggle debug info data (better disabled in production environments)
     * https://docs.angularjs.org/guide/production
     */
    // @ngInject
    function configureDebugging($logProvider, $compileProvider) {
        $compileProvider.debugInfoEnabled(true);
        $logProvider.debugEnabled(true); // from angular style guide(not seen a lot otherwise)
    }

    /**
     * Initialize md theme to teal and orange
     * Material design color palettes
     */
    // @ngInject
    function initTheme($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal', {
                'default': '500',
                'hue-1': '300',
                'hue-2': '700',
                'hue-3': 'A100',
            })
            .accentPalette('orange');
    }

}

    // TODO:
    // 1. Use reading buddies pattern for initialization of router in config
    // resource: https://github.com/cgmartin/ReadingBuddies/blob/master/client/src/app/app.config.ts

    // 2. try this out again
    // reason: used it with onInit
    //     // function initState($state) {
        //     console.log('initialize state called');
        //     $state.go('landing');
        //     console.log($state.name, 'state.name')
    // }
