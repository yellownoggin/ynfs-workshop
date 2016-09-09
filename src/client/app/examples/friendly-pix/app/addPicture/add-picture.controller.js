var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('AddPictureController', AddPictureController);
    function AddPictureController(uploadService, $firebaseAuth, $rootScope, $scope, $q, firebaseFpService, $state) {
        this.title = 'AddPicture';
        this.$rootScope;
        this.$onInit = function () {
            this.uploadService = uploadService;
            this.user = $firebaseAuth().$getAuth();
            console.log(this.user, 'this user in add pic');
            this.state = $state;
            this.currentAuth = $firebaseAuth().$getAuth();
            this.uploadPic = uploadPic;
            this.generateImages = generateImages;
            this.addPolyfills = addPolyfills;
            this.currentFile = this.uploadService.getCurrenFile();
            this.FULL_IMAGE_SPECS = {
                maxDimension: 1280,
                quality: 0.9
            };
            this.THUMB_IMAGE_SPECS = {
                maxDimension: 640,
                quality: 0.7
            };
            this.imageValue = this.uploadService.getImageUrl();
            this.addPolyfills();
        };
        function addPolyfills() {
            if (!HTMLCanvasElement.prototype.toBlob) {
                console.log('add pollys ex');
                Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                    value: function (callback, type, quality) {
                        var binStr = atob(this.toDataURL(type, quality).split(',')[1]);
                        var len = binStr.length;
                        var arr = new Uint8Array(len);
                        for (var i = 0; i < len; i++) {
                            arr[i] = binStr.charCodeAt(i);
                        }
                        callback(new Blob([arr], {
                            type: type || 'image/png'
                        }));
                    }
                });
            }
        }
        function uploadPic(e, caption) {
            var _this = this;
            e.preventDefault();
            var that = this;
            var imageCaption = caption;
            this.generateImages().then(function (pics) {
                console.log(pics.full, 'pics from generateImages');
                firebaseFpService.uploadNewPic(pics.full, pics.thumb, that.currentFile.name, imageCaption)
                    .then(function (postId) {
                    _this.state.go('home.feed');
                    console.log('new pic has been posted');
                }, function (error) {
                    console.error(error);
                });
            });
        }
        function generateImages() {
            var that = this;
            var fullDeferred = $q.defer();
            var thumbDeferred = $q.defer();
            var resolveFullBlob = function (blob) {
                console.log(blob);
                fullDeferred.resolve(blob);
            };
            var resolveThumbBlob = function (blob) { return thumbDeferred.resolve(blob); };
            var displayPicture = function (url) {
                var image = new Image();
                image.src = url;
                var maxThumbDimension = that.THUMB_IMAGE_SPECS.maxDimension;
                var thumbCanvas = _getScaledCanvas(image, maxThumbDimension);
                thumbCanvas.toBlob(resolveThumbBlob, 'image/jpeg', that.THUMB_IMAGE_SPECS.quality);
                var maxFullDimension = that.FULL_IMAGE_SPECS.maxDimension;
                var fullCanvas = _getScaledCanvas(image, maxFullDimension);
                fullCanvas.toBlob(resolveFullBlob, 'image/jpeg', that.FULL_IMAGE_SPECS.quality);
            };
            var reader = new FileReader();
            reader.onload = function (e) { return displayPicture(e.target.result); };
            reader.readAsDataURL(that.currentFile);
            return $q.all([fullDeferred.promise, thumbDeferred.promise]).then(function (results) {
                console.log(results);
                return {
                    full: results[0],
                    thumb: results[1]
                };
            });
        }
        function _getScaledCanvas(image, maxDimension) {
            var thumbCanvas = document.createElement('canvas');
            console.log(thumbCanvas.toBlob, "toBlob check");
            if (image.width > maxDimension ||
                image.height > maxDimension) {
                if (image.width > image.height) {
                    thumbCanvas.width = maxDimension;
                    thumbCanvas.height = maxDimension * image.height / image.width;
                }
                else {
                    thumbCanvas.width = maxDimension * image.width / image.height;
                    thumbCanvas.height = maxDimension;
                }
            }
            else {
                thumbCanvas.width = image.width;
                thumbCanvas.height = image.height;
            }
            thumbCanvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height, 0, 0, thumbCanvas.width, thumbCanvas.height);
            return thumbCanvas;
        }
    }
})(friendlyPix || (friendlyPix = {}));
