/**
 * @author michael.ash
 * Creates a pager for items in a data table.  Uses the startOffset and limitTo filters.
 * Define the collection in the parent scope as an empty arry
 * Watch the collection in the parent scope
 * Initialize  the page property in the parent scope to 1
 * Set the pageSize property in the parent scope.
 */
angular.module('iui.pager', ['iui.tableConfig'])
.directive('iuiPager', ['iuiTableLabels', function (iuiTableLabels) {
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

      var currentPage = function () {
        var result = 1,
          page = scope.pager.page;
        if (!isNaN(page) && page === parseInt(page, 10) && page > 0 && page <= scope.pager.pageCount()){
          result = page;
        }
        return result;
      };

      scope.pager = {
        page: scope.page,
        labels:iuiTableLabels,
        componentId: attrs.id,
        getFirstPage: function(){
          scope.pager.page = 1;
        },
        getPreviousPage: function(){
          if (currentPage() > 1) {
            scope.pager.page = (scope.pager.hasNoPrevious()) ? currentPage() : currentPage() - 1;
          } else {
            scope.pager.page = 1;
          }
        },
        getNextPage: function(){ 
          scope.pager.page = (scope.pager.hasNoMore()) ? currentPage() : currentPage() + 1;
        },
        getLastPage: function(){
          scope.pager.page = scope.pager.pageCount();
        },
        hasNoMore: function (){
          return (scope.pager.page >= scope.pager.pageCount());
        },
        hasNoPrevious: function (){
          return (scope.pager.page <= 1);
        },
        hasNoPages: function (){
          return (scope.pager.pageCount() < 2);
        },
        jumpToPage: function (pageNum) {
          if (!isNaN(pageNum) && pageNum > 0 && pageNum % 1 === 0 && pageNum <= scope.pager.pageCount()){
            scope.pager.page = pageNum;
          } else if (!isNaN(pageNum) && pageNum > 0 && pageNum % 1 === 0 && pageNum > scope.pager.pageCount()) {
            scope.pager.page = scope.pager.pageCount();
          } else {
            return;
          }
        },
        pageCount: function() {
          return Math.ceil(scope.totalRecords / scope.pageSize);
        }

      };

      scope.$watch('pager.page', function() {
        scope.page = currentPage();
      });

      scope.$watch('totalRecords', function(){
        if (scope.pager.page > scope.pager.pageCount()) {
          scope.getFirstPage();
        }
      });

    }
  };
}]);