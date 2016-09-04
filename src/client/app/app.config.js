var ynfsworkshop;
(function (ynfsworkshop) {
    'use strict';
    angular
        .module('ynfsworkshop')
        .config(configureDebugging)
        .config(initTheme)
        .constant('toastr', toastr);
    function configureDebugging($logProvider, $compileProvider) {
        $compileProvider.debugInfoEnabled(true);
        $logProvider.debugEnabled(true);
    }
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
})(ynfsworkshop || (ynfsworkshop = {}));
