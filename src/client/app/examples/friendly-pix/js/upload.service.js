var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .service('uploadService', uploadService);
    function uploadService() {
        var _this = this;
        this.imageUrl = '';
        this.currentFile = {};
        this.getImageUrl = function () {
            return _this.imageUrl;
        };
        this.setImageUrl = function (url) {
            _this.imageUrl = url;
        };
        this.getCurrenFile = function () {
            return _this.currentFile;
        };
        this.setCurrenFile = function (file) {
            _this.currentFile = file;
        };
    }
})(friendlyPix || (friendlyPix = {}));
