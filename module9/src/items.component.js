(function () {
    'use strict';
    angular.module('MenuApp')
        .component('menuItems', {
            templateUrl: 'src/templates/items.html',
            bindings: {
                items: '<'
            }
        });
})();
