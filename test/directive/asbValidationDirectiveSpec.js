'use strict';

describe('directive: asbValidationDirective', function () {
    var $scope;
    var $compile;

    beforeEach(function () {
        module('asb.validation');

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_;
        });
    });

    it('tests a constraint with only an argument', function () {
        $scope.model = { value: null };
        $scope.nullable = false

        var element = angular.element('<form name="testForm"><input name="input" type="text" ng-model="model.value" asb-validate="nullable:nullable" /></form>');
        element = $compile(element)($scope);
        $scope.$apply();
        expect($scope.testForm.input.$valid).toBe(false);

        $scope.model.value = 'hello';
        $scope.$apply();
        expect($scope.testForm.input.$valid).toBe(true);
    });

    it('tests a constraint with two arguments', function () {
        $scope.model = { value: 3 };
        $scope.nullable = false

        var element = angular.element('<form name="testForm"><input name="input" type="text" ng-model="model.value" asb-validate="range:1:5" /></form>');
        element = $compile(element)($scope);
        $scope.$apply();
        expect($scope.testForm.input.$valid).toBe(true);

    });

    it('tests a constraint with two variable arguments arguments', function () {
        $scope.model = { value: 3 };
        $scope.nullable = false;
        $scope.rangeMin = 1;
        $scope.rangeMax = 2;


        var element = angular.element('<form name="testForm"><input name="input" type="text" ng-model="model.value" asb-validate="range:rangeMin:rangeMax" /></form>');
        element = $compile(element)($scope);
        $scope.$apply();
        expect($scope.testForm.input.$valid).toBe(false);

        $scope.rangeMax = 5;
        $scope.$apply();
        expect($scope.testForm.input.$valid).toBe(false);
    });
});