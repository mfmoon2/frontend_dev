(function () {
    'use strict';
    angular.module('MenuApp')
        .config(Config);
    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function Config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/templates/home.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/templates/main-categories.html',
                controller: 'CategoriesController as categories',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('menuItem', {
                url: '/categories/menuItems/:categoryShortName',
                templateUrl: 'src/templates/main-items.html',
                controller: 'MenuItemsController as menuItems',
                resolve: {
                    items: function (MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }
                }
            });
    }
})();
