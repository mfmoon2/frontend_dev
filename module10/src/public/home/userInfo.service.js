(function () {
    'use strict';
    angular.module('restaurant')
        .service('UserInfoService', UserInfoService);
    UserInfoService.$inject = ['$http']
    function UserInfoService($http) {
        let service = this;
        let userInfo = null;
        service.getMenuItems = function(menuItem) {
            return $http({
                method: "GET",
                url: ("https://mmoon9-jhu.herokuapp.com/menu_items/" + menuItem + ".json")
            }).then(function (result) {
                return result.data;
            });
        };
        service.getUserInfo = function () {
            return userInfo;
        };
        service.register = function (userToRegister) {
            userInfo = userToRegister;
        };
    }
})();