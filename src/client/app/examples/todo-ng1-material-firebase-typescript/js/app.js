var todos;
(function (todos) {
    'use strict';
    angular
        .module('todomvc', [
        'firebase',
        'ngAnimate',
        'ngMaterial',
        'ngAria'
    ])
        .config(function ($firebaseRefProvider) {
        var config = {
            apiKey: "AIzaSyBrluAFQu9_-mLqLYaswrvrmEGC26ikAcg",
            authDomain: "todo-fire-264ad.firebaseapp.com",
            databaseURL: "https://todo-fire-264ad.firebaseio.com",
            storageBucket: "todo-fire-264ad.appspot.com",
        };
        firebase.initializeApp(config);
        $firebaseRefProvider.registerUrl({
            default: config.databaseURL,
            array: config.databaseURL + "/todos"
        });
    });
})(todos || (todos = {}));
