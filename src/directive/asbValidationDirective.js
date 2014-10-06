/* global angular */
(function () {
    'use strict';
    angular
        .module('asb.validation')
        .directive('asbValidate', ['asbValidation', function (asbValidation) {
            return {
                restrict: 'A',
                scope: false,
                require: 'ngModel',
                compile: function (element, attrs) {
                    var tokens = attrs.asbValidate.split(':');
                    var constraintName = tokens[0];
                    var constraintPrefix = constraintName.charAt(0).toUpperCase() + constraintName.slice(1);

                    tokens.shift();

                    if (!asbValidation[constraintName]) {
                        throw 'Error! Please define ' + constraintName + ' first';
                    }

                    return function link(scope, element, attrs, ngModelCtrl) {
                        var doCheck = function (value) {
                            var functionArgs = [];
                            for (var i in tokens) {
                                functionArgs.push(scope.$eval(tokens[i]));
                            }

                            functionArgs.unshift(value);
                            ngModelCtrl.$setValidity('asbValidate' + constraintPrefix, asbValidation[constraintName].apply(value, functionArgs));
                        }

                        ngModelCtrl.$parsers.push(doCheck);
                        ngModelCtrl.$formatters.unshift(doCheck);
                    };
                }
            }
        }]);
})();
