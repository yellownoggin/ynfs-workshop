var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('UserController', UserController);
    function UserController($firebaseAuth, $stateParams, userPageService) {
        var _this = this;
        this.$onInit = function () {
            console.log('User controller initiated');
            var vm = _this;
            _this.firebaseAuth = $firebaseAuth;
            _this.user = _this.firebaseAuth().$getAuth();
            console.log($stateParams.uid, '$stateParams');
            userPageService.loadUser($stateParams.uid, _this.avatar, _this.name).then(function (data) {
                console.log(data, 'data inside the user controller');
                vm.profilePic = data.profile_picture;
                vm.fullName = data.full_name;
            });
        };
    }
})(friendlyPix || (friendlyPix = {}));
