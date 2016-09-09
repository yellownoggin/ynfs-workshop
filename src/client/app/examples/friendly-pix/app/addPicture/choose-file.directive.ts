namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .directive('chooseFile', chooseFile)
        .controller('UploadController', UploadController);
    // .directive('chooseFile', chooseFile);

    function chooseFile() {
        return {
            controller: 'UploadController',
            controllerAs: 'uc',
            link: (scope, element, attributes, controller) => {
                var button = element.find('button');
                var input = angular.element(element[0].querySelector('input#fileInput'));

                button.bind('click', () => {
                    input[0].click();
                });

                // TODO: needs better explanation,
                // bind ngmodel 2 the change event on the file and put*
                input.bind('change', (e) => {

                    scope.$apply(() => {
                        console.log(e.target.files, 'target files');
                        controller.readPicture(e);
                        controller.state.go('home.addPicture');
                    });
                    // scope.$apply(() => {
                    //     var files = e.target.files;
                    //     if (files[0]) {
                    //         var fileName = files[0].name;
                    //         console.log(typeof fileName === 'string');
                    //     } else {
                    //         scope.filename = null;
                    //     }
                    // });

                })
            }
        }
    }
    // chooseFile directive

    UploadController.$inject = ['$state', 'uploadService'];

    function UploadController($state, uploadService) {

        this.$onInit = function() {
            this.currentFile = '';
            this.readPicture = readPicture;
            this.state = $state;
            // this.displayPicture = displayPicture;
            this.uploadService = uploadService;
        };


        // Controller methods

        function readPicture(e) {
            var that = this;
            // clear stuff TODO: code needed

            var file = e.target.files[0];
            that.currentFile = file;

            // set file in service to be used by uploadPic & generateImages
            this.uploadService.setCurrenFile(file);

            // TODO: Clear the selection in the filepicker
            // code here
            // resource: http://stackoverflow.com/questions/21708689/clear-text-input-on-click-with-angularjs

            // Only process image files
            if (file.type.match('image.*')) {
                var reader = new FileReader();
                // reader.onload = e => that.displayPicture(e.target.result);
                reader.onload = e => that.uploadService.setImageUrl(e.target.result);
                // Read in the image file is the data url
                reader.readAsDataURL(file);
                // that.disableUploadUi(false);
            }
        }



        // function clear() {
        //     that.currentFile = null;
        //
        //     // TODO: Cancel all Firebase listeners.
        //     // friendlyPix.firebase.cancelAllSubscriptions();
        //
        //     // Clear previously displayed pic
        //     that.
        //  }

        // problem need to get value of url 2 another controller
        // resource: http://stackoverflow.com/questions/18856153/how-can-i-pass-some-data-from-one-controller-to-another-peer-controller
        // function displayPicture (url) {
        // using a different approach right now
        // }
    } // UploadController



} // namespace


////////////////////friendly pics demo code 4 reference
        /**
         * Displays the given pic in the New Pic Upload dialog.
         */
        // displayPicture(url) {
        //   this.newPictureContainer.attr('src', url);
        //   page('/add');
        //   this.imageCaptionInput.focus();
        //   this.uploadButton.prop('disabled', true);
        // }

        //  readPicture(event) {
        //    this.clear();
        //    var file = event.target.files[0]; // FileList object
        //    this.currentFile = file;
        //
        //    // Clear the selection in the file picker input.
        //    this.imageInput.wrap('<form>').closest('form').get(0).reset();
        //    this.imageInput.unwrap();
        //
        //    // Only process image files.
        //    if (file.type.match('image.*')) {
        //      var reader = new FileReader();
        //      reader.onload = e => this.displayPicture(e.target.result);
        //      // Read in the image file as a data URL.
        //      reader.readAsDataURL(file);
        //      this.disableUploadUi(false);
        //    }
        //  }
