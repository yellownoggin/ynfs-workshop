'use strict';
window.friendlyPix = window.friendlyPix || {};
friendlyPix.Auth = (function () {
    function class_1(firebase) {
        this.firebase = firebase;
        this.database = firebase.app().database();
        this.auth = firebase.app().auth();
        this._waitForAuthPromiseResolver = new $.Deferred();
    }
    Object.defineProperty(class_1.prototype, "waitForAuth", {
        get: function () {
            return this._waitForAuthPromiseResolver.promise();
        },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
