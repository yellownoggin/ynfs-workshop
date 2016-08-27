var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .config(configApp);
    function configApp($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('grey', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100',
        })
            .accentPalette('cyan');
        var config = {
            apiKey: "AIzaSyD0mr2QG78H_gP9Te-oUOR3UcRNVLBkuVM",
            authDomain: "friendly-pix-f2d0d.firebaseapp.com",
            databaseURL: "https://friendly-pix-f2d0d.firebaseio.com",
            storageBucket: "friendly-pix-f2d0d.appspot.com",
        };
        firebase.initializeApp(config);
    }
})(friendlyPix || (friendlyPix = {}));
