angular.module('iui.table', ['iuiTableTemplates','iuiTable']);
angular.module('startFrom', [])
.filter('startFrom', function() {
  'use strict';
  return function(input, start) {
    if (input) {
      start = +start; //parse to int
      return input.slice(start);
    }
  };
});

angular.module('iui.pager', [])
.directive('iuiPager', function () {
  'use strict';
  return {
    restrict : 'E',
    replace : true,
    scope : {
      page :  '=',
      pageSize : '=',
      totalRecords : '='
    },
    templateUrl : '/$iui-table/templates/iui-pager.html',
    link : function(scope, element, attrs){
      scope.componentId = attrs.id;
      scope.$watch('totalRecords', function(){
        if (scope.page > scope.pageCount()) {
          scope.getFirstPage();
        }
      });
      scope.total = function(){
        var result = -1,
          count = parseInt(scope.totalRecords,10);
        if (!isNaN(count)){
          result = count;
        }
      };
      scope.currentPage = function () {

        var result = 1,
          page = scope.page;
        if (!isNaN(page)){
          result = page;
        }
        return result;
      };
      scope.page = scope.pageNum = scope.currentPage();

      scope.getFirstPage = function(){
        scope.page = scope.pageNum = 1;
      };
      scope.getPreviousPage = function(){
        scope.page = scope.pageNum = scope.page - 1;
      };
      scope.getNextPage = function(){
        scope.page = scope.pageNum = scope.page + 1;
      };
      scope.getLastPage = function(){
        scope.page = scope.pageNum = scope.pageCount();
      };
      scope.hasNoMore = function (){
        return (scope.page >= scope.pageCount());
      };
      scope.hasNoPrevious = function (){
        return (scope.page <= 1);
      };
      scope.hasNoPages = function (){
        return (scope.pageCount() < 2);
      };
      scope.jumpToPage = function (pageNum) {
        if (!isNaN(pageNum) && pageNum > 0 && pageNum % 1 === 0 && pageNum <= scope.pageCount()){
          scope.page = pageNum;
        } else {
          return;
        }
      };
      scope.goToPage = function (){
        var pageNumber = element.find('input[type=number]'),
            num = parseInt(pageNumber.val(),10);
        scope.page = num;
      };
      scope.pageCount = function() {
        return Math.ceil(scope.totalRecords / scope.pageSize);
      };
    }
  };
});
angular.module('iui.sortHeading', [])
.directive('iuiSortHeading', [function () {
  'use strict';
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

angular.module('iuiTableTemplates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("/$iui-table/templates/iui-pager.html",
    "<div class=\"table-pager iui-pager custom-pagination\" ng-show=\"pageCount()\"><div class=\"table-pager-info\"><span>Total Items: {{totalRecords}}</span></div><div class=\"iui-pager-controls table-pager-buttons\" ng-if=\"pageCount() > 1\"><button class=\"table-pager-first\" data-ng-click=\"getFirstPage()\" data-ng-disabled=\"hasNoPrevious()\"><div class=\"pager-first-triangle\"><div class=\"pager-first-bar\"></div></div><span class=\"first-text sr-only\">First</span></button> <button class=\"table-pager-prev\" data-ng-click=\"getPreviousPage()\" data-ng-disabled=\"hasNoPrevious()\"><div class=\"pager-first-triangle\"></div><span class=\"previous-text sr-only\">Previous</span></button> <span class=\"description\"></span> <span class=\"page\"><label for=\"tblpager_page_{{componentId}}\" class=\"sr-only\">Page</label><input type=\"number\" id=\"tblpager_page_{{componentId}}\" min=\"1\" max=\"{{pageCount()}}\" ng-model=\"page\" ng-change=\"jumpToPage(page)\" data-ng-disabled=\"hasNoPages()\"> <span class=\"pages\" id=\"tblpage_ofPages_{{componentId}}\">/ {{pageCount()}}</span></span> <button class=\"table-pager-next\" data-ng-click=\"getNextPage()\" data-ng-disabled=\"hasNoMore()\"><div class=\"pager-last-triangle\"></div><span class=\"next-text sr-only\">Next</span></button> <button class=\"table-pager-last\" data-ng-click=\"getLastPage()\" data-ng-disabled=\"hasNoMore()\"><div class=\"pager-last-triangle\"><div class=\"pager-last-bar\"></div></div><span class=\"last-text sr-only\">Last</span></button></div></div>");
  $templateCache.put("/$iui-table/templates/iui-sort-heading.html",
    "<a href=\"\" class=\"iui-sort-heading\" role=\"button\" ng-click=\"iuiSortBy = iuiSortKey; iuiReverse=!iuiReverse\" ng-class=\"{'sorted':iuiSortBy === iuiSortKey, 'reversed':iuiSortBy === iuiSortKey && iuiReverse===false}\"><span class=\"sr-only\">Sort by</span> <span ng-transclude></span></a>");
  $templateCache.put("/$iui-table/templates/iui-table-default-row.html",
    "<td ng-repeat=\"column in iuiTable.displayColumns\" data-header=\"{{column.displayName}}\" class=\"iui-table-{{column.field | lowercase}} {{column.columnClass}}\" ng-switch=\"column.field\"><span ng-switch-when=\"date\"><time datetime=\"{{row[column.field] | date:'yyyy-mm-dd'}}\">{{row[column.field] | date:'mm/dd/yyyy'}}</time></span> <span ng-switch-default>{{row[column.field]}}</span></td>");
  $templateCache.put("/$iui-table/templates/iui-table-header-cell.html",
    "<iui-sort-heading ng-if=\"!(columnHeader.sortable === false)\" iui-sort-key=\"{{columnHeader.field}}\" iui-sort-by=\"iuiTable.sortingOptions.field\" iui-reverse=\"iuiTable.sortingOptions.reverse\">{{columnHeader.displayName}}</iui-sort-heading><span ng-if=\"columnHeader.sortable === false\">{{columnHeader.displayName}}</span>");
  $templateCache.put("/$iui-table/templates/iui-table.html",
    "<div class=\"iui-table\"><table class=\"table responsive {{iuiTable.tableClass}}\"><caption ng-if=\"iuiTable.tableCaption\"><span ng-bind=\"iuiTable.tableCaption\" ng-class=\"{'sr-only':iuiTable.hideTableCaption}\"></span></caption><thead><tr><th scope=\"col\" ng-repeat=\"columnHeader in iuiTable.displayColumns | filter:{field:'checkbox'}\" class=\"iui-table-header-{{columnHeader.field | lowercase}} {{columnHeader.columnClass}}\"><input type=\"checkbox\" class=\"custom-checkbox in-table-header\" ng-model=\"selectedAll\" id=\"item-selected-{{iuiTable.tableClass}}\" ng-click=\"checkAll()\"><label for=\"item-selected-{{iuiTable.tableClass}}\"><span class=\"sr-only\">Select All</span></label><span class=\"sr-only\">Selected</span></th><th scope=\"col\" ng-repeat=\"columnHeader in iuiTable.displayColumns | filter:{field:'unread'}\" class=\"iui-table-header-{{columnHeader.field | lowercase}} {{columnHeader.columnClass}}\"><iui-sort-heading iui-sort-key=\"{{columnHeader.field}}\" iui-sort-by=\"iuiTable.sortingOptions.field\" iui-reverse=\"iuiTable.sortingOptions.reverse\"><span class=\"unread-dot-indicator\"></span> <span class=\"sr-only\">Unread</span></iui-sort-heading></th><th scope=\"col\" ng-repeat=\"columnHeader in iuiTable.displayColumns | filter:{field:'!checkbox'} | filter:{field:'!Button'} | filter:{field:'!unread'}\" class=\"iui-table-header-{{columnHeader.field | lowercase}} {{columnHeader.columnClass}}\" ng-include=\"(columnHeader.headerCellTemplate)? columnHeader.headerCellTemplate : iuiTable.settings.defaultHeaderCellTemplate\"></th><th scope=\"col\" ng-repeat=\"columnHeader in iuiTable.displayColumns | filter:{field:'Button'}\" class=\"iui-table-header-{{columnHeader.field | lowercase}} {{columnHeader.columnClass}}\"><span class=\"sr-only\">Actions</span></th></tr></thead><tbody ng-if=\"!iuiTable.serverSideSorting\"><tr ng-repeat=\"row in iuiTable.rowData | orderBy:iuiTable.sortingOptions.field:iuiTable.sortingOptions.reverse | startFrom:(iuiTable.pagingOption.currentPage-1)*iuiTable.pagingOption.pageSize | limitTo:iuiTable.pagingOption.pageSize\" ng-include=\"(iuiTable.rowTemplate)?iuiTable.rowTemplate:iuiTable.settings.defaultRowTemplate\"></tr></tbody><tbody ng-if=\"iuiTable.serverSideSorting\"><tr ng-repeat=\"row in iuiTable.rowData | startFrom:(iuiTable.pagingOption.currentPage-1)*iuiTable.pagingOption.pageSize | limitTo:iuiTable.pagingOption.pageSize\" ng-include=\"(iuiTable.rowTemplate)?iuiTable.rowTemplate:iuiTable.settings.defaultRowTemplate\"></tr></tbody></table>ddd {{iuiTable.pagingOption.currentPage}}<iui-pager ng-if=\"iuiTable.rowData.length > 0 && !iuiTable.hideTablePager\" page=\"iuiTable.pagingOption.currentPage\" page-size=\"iuiTable.pagingOption.pageSize\" total-records=\"iuiTable.rowData.length\"></iui-pager></div>");
}]);
