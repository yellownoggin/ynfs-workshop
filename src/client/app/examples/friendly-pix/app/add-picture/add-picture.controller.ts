namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('AddPictureController', AddPictureController);

    function AddPictureController(uploadService, currentAuth, Auth, $rootScope, $scope, $q, firebaseFpService, $state) {
        this.title = 'AddPicture';
        this.$rootScope;
        this.$onInit = function() {
            this.uploadService = uploadService;
            // this.displayPicture = displayPicture;
            this.auth = Auth;
            this.user = this.auth.$getAuth();
            console.log(this.user, 'this user in add pic');
            this.state = $state;
            this.currentAuth = currentAuth;
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


            // this.displayPicture();
            this.imageValue = this.uploadService.getImageUrl();
            this.addPolyfills();


            // console.log(this.imageValue, 'this.imageValue oninit');
            // console.log(this.Auth, 'this.Auth');
            // console.log(this.currentAuth, 'this.currentAuth');
        }


        // Adds polyfills requireed for the Uploader.
        function addPolyfills() {

            // Polyfill for canvas.toBlob().
            if (!HTMLCanvasElement.prototype.toBlob) {
                console.log('add pollys ex');
                Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                    value: function(callback, type, quality) {
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



        /**
 * Uploads the pic to Firebase Storage and add a new post into the Firebase Database.
 */

        function uploadPic(e, caption) {
            e.preventDefault();
            var that = this;
            // this.disableUploadUi(true);
            var imageCaption = caption;

            this.generateImages().then(pics => {

                // console.log(pics[0].type, 'pics from generateImages');
                console.log(pics.full, 'pics from generateImages');
                // Upload the File upload to Firebase Storage and create new post.
                // TODO Jamie: needs to be created
                firebaseFpService.uploadNewPic(pics.full, pics.thumb, that.currentFile.name, imageCaption)
                    .then(postId => {
                        this.state.go('profile');
                        console.log('new pic has been posted');
                        // TODO Jamie: toast needs to be created
                        // page(`/user/${this.auth.currentUser.uid}`);
                        // var data = {
                        //   message: 'New pic has been posted!',
                        //   actionHandler: () => page(`/post/${postId}`),
                        //   actionText: 'View',
                        //   timeout: 10000
                        // };
                        // this.toast[0].MaterialSnackbar.showSnackbar(data);
                        // TODO Jamie: disableUpload needs to be created
                        // this.disableUploadUi(false);
                    }, error => {
                        console.error(error);
                        // var data = {
                        //   message: `There was an error while posting your pic. Sorry!`,
                        //   timeout: 5000
                        // };
                        // this.toast[0].MaterialSnackbar.showSnackbar(data);
                        // this.disableUploadUi(false);
                    });
            });
        }


        /**
 * Generates the full size image and image thumb using canvas and returns them in a promise.
 */
        function generateImages() {
            var that = this;
            const fullDeferred = $q.defer();
            const thumbDeferred = $q.defer();

            const resolveFullBlob = (blob) => {
                console.log(blob);
                fullDeferred.resolve(blob);
            }


            const resolveThumbBlob = blob => thumbDeferred.resolve(blob);

            const displayPicture = url => {
                const image = new Image();

                image.src = url;

                // Generate thumb.
                const maxThumbDimension = that.THUMB_IMAGE_SPECS.maxDimension;
                const thumbCanvas = _getScaledCanvas(image, maxThumbDimension);
                thumbCanvas.toBlob(resolveThumbBlob, 'image/jpeg', that.THUMB_IMAGE_SPECS.quality);


                // Generate full sized image.
                const maxFullDimension = that.FULL_IMAGE_SPECS.maxDimension;

                const fullCanvas = _getScaledCanvas(image, maxFullDimension);

                fullCanvas.toBlob(resolveFullBlob, 'image/jpeg', that.FULL_IMAGE_SPECS.quality);
            };

            const reader = new FileReader();
            reader.onload = e => displayPicture(e.target.result);
            reader.readAsDataURL(that.currentFile);

            return $q.all([fullDeferred.promise, thumbDeferred.promise]).then(results => {
                console.log(results);
                return {
                    full: results[0],
                    thumb: results[1]
                };
            });
        }

        function _getScaledCanvas(image, maxDimension) {
            const thumbCanvas = document.createElement('canvas');
            console.log(thumbCanvas.toBlob, "toBlob check");
            if (image.width > maxDimension ||
                image.height > maxDimension) {
                if (image.width > image.height) {
                    thumbCanvas.width = maxDimension;
                    thumbCanvas.height = maxDimension * image.height / image.width;
                } else {
                    thumbCanvas.width = maxDimension * image.width / image.height;
                    thumbCanvas.height = maxDimension;
                }
            } else {
                thumbCanvas.width = image.width;
                thumbCanvas.height = image.height;
            }
            thumbCanvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height,
                0, 0, thumbCanvas.width, thumbCanvas.height);
            return thumbCanvas;
        }

        //         $rootScope.$on('$stateChangeStart',
        //    function(event, toState, toParams, fromState, fromParams) {
        //     if (toState.name  !== 'addPicture') {
        //         var that = this;
        //         that.imageValue = '';
        //         that.uploadService.setImageUrl(that.imageValue);
        //     }
        // });
        //
        //

        //         this.$onDestroy = function() {
        //             console.log('on destroyed called');
        //             // this.imageValue = '';
        //             // this.uploadService.setImageUrl(this.imageValue);
        //             // var a = this.uploadService.getImageUrl();
        //             // console.log(this.imageValue, 'this image value')
        //             // console.log(a, 'getImageUrl')
        //         }
        //
        //         $scope.$on("destroy", () => console.log('destroyed'));
        //
        //         function displayPicture() {
        //             console.log(this.imageValue, 'image value 1');
        //
        //             this.imageValue = '';
        //             console.log(this.imageValue, 'image value 2');
        //
        //             this.imageValue = uploadService.getImageUrl();
        //             console.log(this.imageValue, 'image value 3');
        //         }
    }
}
