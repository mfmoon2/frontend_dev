(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .controller('ToBuyController', ToBuyController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        let alreadyBought = this;
        alreadyBought.list = ShoppingListCheckOffService.getBought();
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        let toBuy = this;
        toBuy.list = ShoppingListCheckOffService.getToBuy();
        toBuy.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buy(itemIndex);
        }
    }

    function ShoppingListCheckOffService() {
        let service = this;
        let boughtArray = [];
        let toBuyArray = [
            {name:"cookies", quantity: 2, pricePerItem: 2},
            {name:"beer", quantity: 24, pricePerItem: 15},
            {name:"crackers", quantity: 5, pricePerItem: 1.50},
            {name:"ice cream", quantity: 1, pricePerItem: 5.75},
            {name:"peanuts", quantity: 3, pricePerItem: 5}
        ];

        service.getBought = function () {
            return boughtArray;
        };

        service.getToBuy = function () {
            return toBuyArray;
        };

        service.buy = function (index) {
            let buyMe = toBuyArray[index];
            if (buyMe.quantity == undefined || buyMe.quantity == '') {
                buyMe.quantity = 0;
            }
            boughtArray.push(buyMe);
            toBuyArray.splice(index, 1);
        };
    }

})();