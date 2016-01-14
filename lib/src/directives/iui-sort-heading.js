angular.module('iui.sortHeading', ['iui.tableConfig'])
.directive('iuiSortHeading', ['iuiTableLabels', function (iuiTableLabels) {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope :{
      iuiSortKey: '@',
      iuiSortBy: '=',
      iuiReverse: '='
    },
    templateUrl: app.root + '$iui-table/templates/iui-sort-heading.html',
    link: function(scope) {
      // defaults to English if scope.iuiLabels.sortBy is not defined
      scope.labels = iuiTableLabels;
    }
  };
}]);