(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);
    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        let menuSearchService = this;
        menuSearchService.getMatchedMenuItems = function (search) {
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function (result) {
                let matches = [];
                let menu = result.data.menu_items;
                for (let index in menu) {
                    if (menu[index].description.includes(search)) {
                        matches.push(menu[index]);
                    }
                }
                return matches;
            });
        };
    }
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        let nit = this;
        nit.search = "";
        nit.found = [];
        nit.callCount = 0;
        nit.remove = function (index) {
            nit.found.splice(index, 1);
        };
        nit.narrow = function() {
            nit.callCount += 1;
            if (nit.search === "") {
                nit.found = [];
                return;
            }
            let promise = MenuSearchService.getMatchedMenuItems(nit.search);
            promise.then(function (response) {
                nit.found = response;
            }).catch(function (error) {
                console.log(error)
            })
        };
    }
    function FoundItemsDirective() {
        let ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'narrowItDown',
            bindToController: true
        };
        return ddo;
    };
})();