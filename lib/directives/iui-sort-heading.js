(function (app) {
  'use strict';

  app.directive('iuiSortHeading', [function () {
    return {
      restrict: 'E',
      transclude: true,
      scope :{
        iuiSortKey: '@',
        iuiSortBy: '=',
        iuiReverse: '='
      },
      templateUrl: app.root + '$iui-table/templates/iui-sort-heading.html'
    };
  }]);
}(window.app));