namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .config(initTheme)
        .config(initFirebaseApp)
        .constant('latinize', latinize);

    /**
     * initTheme - description
     * Sets the themes pallets
     */
    // @ngInject
    function initTheme($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('grey', {
                'default': '500',
                'hue-1': '300',
                'hue-2': '700',
                'hue-3': 'A100',
            })
            .accentPalette('cyan');
    }

    /**
     * initFirebaseApp - description
     * Initializes friendlyPix app with firebase
     */
     // @ngInject
    function initFirebaseApp() {
        var config = {
            apiKey: "AIzaSyD0mr2QG78H_gP9Te-oUOR3UcRNVLBkuVM",
            authDomain: "friendly-pix-f2d0d.firebaseapp.com",
            databaseURL: "https://friendly-pix-f2d0d.firebaseio.com",
            storageBucket: "friendly-pix-f2d0d.appspot.com",
        };
        firebase.initializeApp(config);
    }

    // TODO:  cannot find firebase ui
    // try again - remember toastr, etc with constant
    // FirebaseUI config.
    // var uiConfig = {
    //     'signInSuccessUrl': '/',
    //     'signInOptions': [
    //         firebase.auth.GoogleAuthProvider.PROVIDER_ID
    //     ]
    // };
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // ui.start('#firebaseui-auth-container', uiConfig);



}
}
