namespace app {
    'use strict';

    angular
        .module('ynfsworkshop', [
            'ngMaterial',
            'ngAria',
            'ngAnimate'
        ])
        .controller('TemplateController', TemplateController)
        .config(initTheme);

        function TemplateController() {
            this.title = 'YNFS Workshop';
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
}
