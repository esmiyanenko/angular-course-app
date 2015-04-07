'use strict';

angular.module('awesome-app.common.components.memberTags')

.directive('memberTags', function () {

    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        templateUrl: '../common/components/memberTags/memberTags.tpl.html'
    };

});