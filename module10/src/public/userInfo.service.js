(function () {
    'use strict';
    angular.module('restaurant')
        .service('UserInfoService', UserInfoService);
    UserInfoService.$inject = ['$http', 'ApiPath']
    function UserInfoService($http, ApiPath) {
        let service = this;
        let userInfo = null;
        service.getMenuItems = function(menuItem) {
            return $http({
                method: "GET",
                url: (ApiPath + "/menu_items/" + menuItem + ".json")
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