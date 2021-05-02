(function () {
    "use strict";
    angular.module('public')
        .controller('UserController', UserController);
    UserController.$inject = ['UserInfoService'];
    function UserController(UserInfoService) {
        let ctrl = this;
        ctrl.userInfo = UserInfoService.getUserInfo();
    }
})();