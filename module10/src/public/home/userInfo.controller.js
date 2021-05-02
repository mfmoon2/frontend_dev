(function () {
    "use strict";
    angular.module('public')
        .controller('UserInfoController', UserInfoController);
    UserInfoController.$inject = ['UserInfoService'];
    function UserInfoController(UserInfoService) {
        let ctrl = this;
        ctrl.userInfo = UserInfoService.getUserInfo();
    }
})();