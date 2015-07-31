angular.module('iuiTable', ['iui.pager', 'iui.sortHeading', 'startFrom'])
.directive('iuiTable', [function () {
  'use strict';
  return {
    restrict: 'E',
    templateUrl: app.root + '$iui-table/templates/iui-table.html',
    scope: true,
    link: function(scope, element, attrs) {
      scope.iuiTable = {};
      scope.iuiTable.settings = {};

      scope.iuiTable.settings.defaultRowTemplate = app.root + '$iui-table/templates/iui-table-default-row.html';
      scope.iuiTable.settings.defaultHeaderCellTemplate = app.root + '$iui-table/templates/iui-table-header-cell.html';

      scope.iuiTable.pagingOption = {
        currentPage: 1,
        pageSize: 10
      };
      scope.iuiTable.pagingOption.currentPage = 1;

      scope.$watch(attrs.displayColumns, function(newVal) {
        scope.iuiTable.displayColumns = newVal;
      });
      scope.$watch(attrs.rowData, function(newVal) {
        scope.iuiTable.rowData = newVal;
      });
      scope.$watch(attrs.tableCaption, function(newVal) {
        scope.iuiTable.tableCaption = newVal;
      });
      scope.$watch(attrs.hideTableCaption, function(newVal) {
        scope.iuiTable.hideTableCaption = newVal;
      });
      scope.$watch(attrs.hideTablePager, function(newVal) {
        scope.iuiTable.hideTablePager = newVal;
      });
      scope.$watch(attrs.rowTemplate, function(newVal) {
        scope.iuiTable.rowTemplate = newVal;
      });
      scope.$watch(attrs.tableClass, function(newVal) {
        scope.iuiTable.tableClass = newVal;
      });

      scope.$watch(attrs.pageSize, function(newVal) {
        scope.iuiTable.pagingOption.pageSize = newVal || scope.iuiTable.pagingOption.pageSize;
      });

      scope.iuiTable.sortingOptions = scope.$parent.$eval(attrs.sortingOptions);

      scope.$watch(attrs.serverSideSorting, function(newVal) {
        scope.iuiTable.serverSideSorting = newVal;
      });

      scope.iuiTable.selectedItems = scope.$parent.$eval(attrs.selectedItems);
      // Selected items array builder
      scope.determineSelectedItems = function() {
        scope.iuiTable.selectedItems = [];
        _.each(scope.iuiTable.rowData, function(column) {
          if (column.selected === true) {
            scope.iuiTable.selectedItems.push(column);
          }
        });
      };

      // Add checkbox functionality. This function iterates through the
      // gridColumn data and finds the ng-model of column.selected and
      // assigns truth to the selectedAll object.
      scope.checkAll = function() {
        scope.selectedAll = !scope.selectedAll;
        _.filter(scope.iuiTable.rowData, function(column) {
          column.selected = scope.selectedAll;
        });
        scope.determineSelectedItems();
      };
      //  If all checkboxes are selected, then check the table header checkbox
      scope.isAllSelected = function() {
        scope.selectedAll = _.every(scope.iuiTable.rowData, function(column) {
          return column.selected;
        });
        scope.determineSelectedItems();
      };
    }
  };
}]);
