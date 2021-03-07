(function () {
    'use strict';
    let successMessage = "Enjoy!";
    let errorMessage = "Too much!";
    let emptyMessage = "Please enter data first";
    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchInput = '';
        $scope.messageReady = false;
        $scope.emptyDetected = false;
        $scope.inputClass = "form-group";
        $scope.messageClass = "form-group message";
        $scope.validateInput = function () {
            $scope.messageReady = true;
            $scope.emptyDetected = false;
            if ($scope.lunchInput.trim() == '') {
                $scope.message = emptyMessage;
                setClasses(false);
                return;
            }
            let inputs = $scope.lunchInput.split(",");
            let count = 0;
            for (let i in inputs) {
                let input = inputs[i].trim();
                if (input == '' || input.length == 0) {
                    $scope.emptyDetected = true;
                    continue;
                } else {
                    count++;
                }
            }
            if (count == 0) {
                $scope.message = emptyMessage;
                setClasses(false);
            } else if (count <= 3) {
                $scope.message = successMessage;
                setClasses(true);
            } else {
                $scope.message = errorMessage;
                setClasses(true);
            }
        }
        const setClasses = function (isGreen) {
            if (isGreen) {
                $scope.messageClass = "form-group message fontGreen";
                $scope.inputClass = "form-group outlineGreen";
            } else {
                $scope.messageClass = "form-group message fontRed";
                $scope.inputClass = "form-group outlineRed";
            }
        };
    }
})();