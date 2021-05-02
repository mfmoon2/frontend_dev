(function () {
    "use strict";
    angular.module('public')
        .controller('RegisterController', RegisterController);
    RegisterController.$inject = ['UserInfoService'];
    function RegisterController(UserInfoService) {
        let ctrl = this;
        ctrl.user = UserInfoService.getUserInfo();
        if (ctrl.user === null) {
            ctrl.user = {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                favMenuItem: "",
                fullFaveItem: {}
            };
            ctrl.registered = false;
        } else {
            ctrl.registered = true;
        }
        ctrl.register = function() {
            UserInfoService.register(ctrl.user);
            ctrl.registered = true;
        }
        ctrl.validateFavMenuItem = function() {
            let promise = UserInfoService.getMenuItems(ctrl.user.favMenuItem);
            promise.then(function (response) {
                ctrl.user.fullFavItem = response;
                ctrl.errorFavItem = false;
            })
            .catch(function (error) {
                ctrl.errorFavItem = true;
            })
        }
    }
})();
