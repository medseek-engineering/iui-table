angular.module('iui.table', ['iui.tableTemplates','iuiTable']);

angular.module('iui.tableConfig', [])
.value('iuiTableLabels', {
  totalItems: 'Total Items',
  first: 'First',
  previous: 'Previous',
  page: 'Page',
  next: 'Next',
  last: 'Last',
  sortBy: 'Sort By',
  selected: 'Selected',
  selectAll: 'Select All',
  unread: 'Unread',
  actions: 'Actions',
  emptyMessage: 'There is no data to display.',
})
.constant('iuiTableConfig', {
  defaultRowTemplate: '$iui-table/templates/iui-table-default-row.html',
  defaultHeaderCellTemplate: '$iui-table/templates/iui-table-header-cell.html',
  pagingOption: {
    currentPage: 1,
    pageSize: 10
  }
});
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
/*doc
---
title: iui-table
name: iui-table
category: directives
---

Adding the iui-table directive to your markup:

```js_example
app.controller('TableController', [function () {
  var that = this;
  that.data = [
    {
      firstName: 'Joe',
      lastName: 'Smith'
    },
    {
      firstName: 'Janet',
      lastName: 'Doe'
    }
  ];
  that.gridColumns = [
    {
      field: 'firstName',
      displayName: 'First Name',
      columnClass: 'table-column-first-name'
    },
    {
      field: 'lastName',
      displayName: 'Last Name'
      //headerCellTemplate: 'templates/url-of-header-template.html'
    }
  ];
  that.sortingOptions = {
    field: 'lastName',
    reverse: false
  };
}]);
```

```html_example
<div ng-controller="TableController as table">
  <iui-table 
    display-columns="table.gridColumns" 
    row-data="table.data" 
    hide-table-pager="false" 
    sorting-options="table.sortingOption" 
    table-class="'table-names responsive'" 
    table-caption="'Table of Names'"
    hide-table-caption="false"
    page-size="10"
    server-side-sorting="false"
    empty-row-data-message="There is no data to display."></iui-table>
</div>
```

## Directive Attributes

<dl class="dl-horizontal dt-as-left-aligned short-list">
  <dt>displayColumns</dt>
  <dd><code>Array</code> <b>Required</b> - defines the columns in the grid</dd>
  <dt>rowData</dt>
  <dd><code>Array</code> <b>Required</b> - array of data. Only the fields defined in the displayColumns will show</dd>
  <dt>hideTablePager</dt>
  <dd><code>Boolean</code> - determines if the pagination at the bottom should show</dd>
  <dt>rowTemplate</dt>
  <dd><code>String</code> - allows a custom row template to be passed in</dd>
  <dt>sortingOptions</dt>
  <dd><code>Object</code> - with two properties field: <code>String</code> and reverse: <code>Boolean</code></dd>
  <dt>tableCaption</dt>
  <dd><code>String</code> - gives the table a caption</dd>
  <dt>hideTableCaption</dt>
  <dd><code>Boolean</code> - puts a class of sr-only on the table caption. That way the heading is still visible to screen readers</dd>
  <dt>tableClass</dt>
  <dd><code>String</code> - passes in class to table. You can chain table classes like 'class1 class2'</dd>
  <dt>pageSize</dt>
  <dd><code>Counting Number</code> - defaults to 10</dd>
  <dt>serverSideSorting</dt>
  <dd><code>Boolean</code> - if there is server side sorting set to true</dd>
  <dt>empty-row-data-message</dt>
  <dd><code>String</code> - a message that displays when there's no data in the table. The default is "There's no data to display in this table."</dd>
</dl>

## Table with Pagination

```html_example
<div ng-controller="TableController2 as table">
  <iui-table 
    display-columns="table.gridColumns" 
    row-data="table.data"></iui-table>
</div>
```

```js_example
app.controller('TableController2', [function () {
  var that = this;
  that.gridColumns = [
    {
      field: 'codeName',
      displayName: 'Code Name',
      columnClass: 'code-name-custom-class'
    },
    {
      field: 'agency',
      displayName: 'Agency',
      columnClass: 'agencyCustomClass'
    }
  ];
  that.data = [
    {
      name: 'Maxwell Smart',
      codeName: 'Agent 86',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 99',
      agency: 'CONTROL'
    },
    {
      codeName: 'Mr. Big',
      agency: 'KAOS'
    },
    {
      codeName: 'The Chief',
      agency: 'CONTROL'
    },
    {
      codeName: 'Hymie the Robot',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 8',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 13',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 44',
      agency: 'CONTROL'
    },
    {
      codeName: 'Ludwig Von Siegfried',
      agency: 'KAOS'
    },
    {
      codeName: 'Shtarker',
      agency: 'KAOS'
    },
    {
      codeName: 'The Claw',
      agency: 'KAOS'
    },
    {
      codeName: 'Spinoza',
      agency: 'KAOS'
    },
    {
      codeName: 'Fang',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 1',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 2',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 3',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 4',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 5',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 6',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 7',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 9',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 10',
      agency: 'CONTROL'
    },
    {
      codeName: 'Agent 11',
      agency: 'CONTROL'
    }
  ];
}]);
```

## Foreign Language Support

iui-table includes a number of sr-only labels that are used for accessibility reasons. 
To customize/change these labels, you can access the `iuiTableLabels` service. Changing 
these values will change the labels app wide. 
<dl class="dl-horizontal dt-as-left-aligned short-list">
  <dt>totalItems</dt><dd>Total Items</dd>
  <dt>first</dt><dd>First</dd>
  <dt>previous</dt><dd>Previous</dd>
  <dt>page</dt><dd>Page</dd>
  <dt>next</dt><dd>Next</dd>
  <dt>last</dt><dd>Last</dd>
  <dt>sortBy</dt><dd>Sort By</dd>
  <dt>selected</dt><dd>Selected</dd>
  <dt>selectAll</dt><dd>Select All</dd>
  <dt>unread</dt><dd>Unread</dd>
  <dt>actions</dt><dd>Actions</dd>
</dl>

*/


angular.module('iuiTable', ['iui.tableConfig', 'iui.pager', 'iui.sortHeading', 'startFrom'])
.directive('iuiTable', ['iuiTableConfig', 'iuiTableLabels',function (iuiTableConfig, iuiTableLabels) {
  'use strict';
  return {
    restrict: 'E',
    templateUrl: app.root + '$iui-table/templates/iui-table.html',
    scope: true,
    link: function(scope, element, attrs) {
      scope.iuiTable = {
        settings: {
          defaultRowTemplate: app.root + iuiTableConfig.defaultRowTemplate,
          defaultHeaderCellTemplate: app.root + iuiTableConfig.defaultHeaderCellTemplate,
          labels: iuiTableLabels
        },
        pagingOption: angular.copy(iuiTableConfig.pagingOption),
        sortingOptions: scope.$parent.$eval(attrs.sortingOptions),
        selectedItems: scope.$parent.$eval(attrs.selectedItems),
      };

      var watchAttributes = [
        'displayColumns',
        'rowData',
        'tableCaption',
        'hideTableCaption',
        'hideTablePager',
        'rowTemplate',
        'tableClass',
        'serverSideSorting',
        'emptyRowDataMessage'
      ];

      _.each(watchAttributes, function(attributeName) {
        scope.$watch(attrs[attributeName], function (newVal) {
          scope.iuiTable[attributeName] = newVal;
        });
      });

      scope.$watch(attrs.pageSize, function(newVal) {
        scope.iuiTable.pagingOption.pageSize = newVal || scope.iuiTable.pagingOption.pageSize;
      });

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

(function(module) {
try {
  module = angular.module('iui.tableTemplates');
} catch (e) {
  module = angular.module('iui.tableTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-table/templates/iui-pager.html',
    '<div class="table-pager iui-pager custom-pagination" ng-show="pager.pageCount()">\n' +
    '  <div class="table-pager-info"><span>{{pager.labels.totalItems}}: {{totalRecords}}</span></div>\n' +
    '  <div class="iui-pager-controls table-pager-buttons" ng-if="pager.pageCount() > 1">\n' +
    '    <button type="button" class="btn btn-default iui-pager-button table-pager-first" data-ng-click="pager.getFirstPage()"  data-ng-disabled="pager.hasNoPrevious()">\n' +
    '      <div class="pager-first-triangle"><div class="pager-first-bar"></div></div>\n' +
    '      <span class="first-text sr-only" ng-bind="pager.labels.first"></span>\n' +
    '    </button>\n' +
    '    <button type="button" class="btn btn-default iui-pager-button table-pager-prev"  data-ng-click="pager.getPreviousPage()" data-ng-disabled="pager.hasNoPrevious()">\n' +
    '      <div class="pager-first-triangle"></div>\n' +
    '      <span class="previous-text sr-only" ng-bind="pager.labels.previous"></span>\n' +
    '    </button>\n' +
    '    <span class="description"></span>\n' +
    '    <span class="page">\n' +
    '      <label for="tblpager_page_{{pager.componentId}}" class="sr-only" ng-bind="pager.labels.page"></label>\n' +
    '      <input type="number" class="form-control" id="tblpager_page_{{pager.componentId}}" min="1" max="{{pager.pageCount()}}" ng-model="pager.page" ng-change="jumpToPage(pager.page)" data-ng-disabled="pager.hasNoPages()">\n' +
    '      <span class="pages" id="tblpage_ofPages_{{pager.componentId}}"> / {{pager.pageCount()}}</span>\n' +
    '    </span>\n' +
    '    <button type="button" class="btn btn-default iui-pager-button table-pager-next" data-ng-click="pager.getNextPage()" data-ng-disabled="pager.hasNoMore()">\n' +
    '      <div class="pager-last-triangle"></div>\n' +
    '      <span class="next-text sr-only" ng-bind="pager.labels.next"></span>\n' +
    '    </button>\n' +
    '    <button type="button" class="btn btn-default iui-pager-button table-pager-last" data-ng-click="pager.getLastPage()" data-ng-disabled="pager.hasNoMore()">\n' +
    '      <div class="pager-last-triangle"><div class="pager-last-bar"></div></div>\n' +
    '      <span class="last-text sr-only" ng-bind="pager.labels.last"></span>\n' +
    '    </button>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.tableTemplates');
} catch (e) {
  module = angular.module('iui.tableTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-table/templates/iui-sort-heading.html',
    '<a href="" class="iui-sort-heading" role="button" ng-click="iuiSortBy = iuiSortKey; iuiReverse=!iuiReverse" ng-class="{\'sorted\':iuiSortBy === iuiSortKey, \'reversed\':iuiSortBy === iuiSortKey && iuiReverse===false}">\n' +
    '  <span class="sr-only" ng-bind="labels.sortBy"></span>\n' +
    '  <span ng-transclude></span>\n' +
    '</a>');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.tableTemplates');
} catch (e) {
  module = angular.module('iui.tableTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-table/templates/iui-table-default-row.html',
    '<td\n' +
    '	ng-repeat="column in iuiTable.displayColumns | filter:{visible:\'!false\'}"\n' +
    '	data-header="{{column.displayName}}"\n' +
    '	class="iui-table-{{column.field | lowercase}} {{column.columnClass}}"\n' +
    '	ng-switch="column.field">\n' +
    '  <span ng-switch-when="date">\n' +
    '    <time datetime="{{row[column.field] | date:\'yyyy-mm-dd\'}}">{{row[column.field] | date:\'mm/dd/yyyy\'}}</time>\n' +
    '  </span>\n' +
    '  <span ng-switch-default>\n' +
    '    {{row[column.field]}}\n' +
    '  </span>\n' +
    '</td>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.tableTemplates');
} catch (e) {
  module = angular.module('iui.tableTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-table/templates/iui-table-header-cell.html',
    '<iui-sort-heading\n' +
    '	ng-if="!(columnHeader.sortable === false)"\n' +
    '	iui-sort-key="{{columnHeader.field}}"\n' +
    '	iui-sort-by="iuiTable.sortingOptions.field"\n' +
    '	iui-reverse="iuiTable.sortingOptions.reverse">\n' +
    '	{{columnHeader.displayName}}\n' +
    '</iui-sort-heading>\n' +
    '<span ng-if="columnHeader.sortable === false">\n' +
    '	{{columnHeader.displayName}}\n' +
    '</span>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('iui.tableTemplates');
} catch (e) {
  module = angular.module('iui.tableTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/$iui-table/templates/iui-table.html',
    '<div class="iui-table">\n' +
    '  <table class="table responsive {{iuiTable.tableClass}}">\n' +
    '    <caption ng-if="iuiTable.tableCaption">\n' +
    '      <span\n' +
    '        ng-bind="iuiTable.tableCaption"\n' +
    '        ng-class="{\'sr-only\':iuiTable.hideTableCaption}">\n' +
    '      </span>\n' +
    '    </caption>\n' +
    '    <thead>\n' +
    '      <tr>\n' +
    '        <th scope="col" ng-repeat="columnHeader in iuiTable.displayColumns | filter:{field:\'checkbox\'}" class="iui-table-header-{{columnHeader.field | lowercase}} {{columnHeader.columnClass}}">\n' +
    '          <input type="checkbox" class="custom-checkbox in-table-header" ng-model="selectedAll" id="item-selected-{{iuiTable.tableClass}}" ng-click="checkAll()">\n' +
    '          <label for="item-selected-{{iuiTable.tableClass}}"><span class="sr-only">{{iuiTable.settings.labels.selectAll}}</span></label>\n' +
    '          <span class="sr-only">{{iuiTable.settings.labels.selected}}</span>\n' +
    '        </th>\n' +
    '        <th scope="col" ng-repeat="columnHeader in iuiTable.displayColumns | filter:{field:\'unread\'}" class="iui-table-header-{{columnHeader.field | lowercase}} {{columnHeader.columnClass}}">\n' +
    '          <iui-sort-heading\n' +
    '            iui-sort-key="{{columnHeader.field}}"\n' +
    '            iui-sort-by="iuiTable.sortingOptions.field"\n' +
    '            iui-reverse="iuiTable.sortingOptions.reverse">\n' +
    '            <span class="unread-dot-indicator"></span>\n' +
    '            <span class="sr-only">{{iuiTable.settings.labels.unread}}</span>\n' +
    '          </iui-sort-heading>\n' +
    '        </th>\n' +
    '        <th\n' +
    '          scope="col"\n' +
    '          ng-repeat="columnHeader in iuiTable.displayColumns | filter:{field:\'!checkbox\'} | filter:{field:\'!Button\'} | filter:{field:\'!unread\'} | filter:{visible:\'!false\'}"\n' +
    '          class="iui-table-header-{{columnHeader.field | lowercase}} {{columnHeader.columnClass}}"\n' +
    '          ng-include="(columnHeader.headerCellTemplate)? columnHeader.headerCellTemplate : iuiTable.settings.defaultHeaderCellTemplate">\n' +
    '        </th>\n' +
    '        <th scope="col" ng-repeat="columnHeader in iuiTable.displayColumns | filter:{field:\'Button\'}" class="iui-table-header-{{columnHeader.field | lowercase}} {{columnHeader.columnClass}}">\n' +
    '          <span class="sr-only">{{iuiTable.settings.labels.actions}}</span>\n' +
    '        </th>\n' +
    '      </tr>\n' +
    '    </thead>\n' +
    '    <tbody ng-if="!iuiTable.serverSideSorting && iuiTable.rowData.length">\n' +
    '      <tr\n' +
    '        ng-repeat="row in iuiTable.rowData | orderBy:iuiTable.sortingOptions.field:iuiTable.sortingOptions.reverse | startFrom:(iuiTable.pagingOption.currentPage-1)*iuiTable.pagingOption.pageSize | limitTo:iuiTable.pagingOption.pageSize"\n' +
    '        ng-include="(iuiTable.rowTemplate)?iuiTable.rowTemplate:iuiTable.settings.defaultRowTemplate">\n' +
    '      </tr>\n' +
    '    </tbody>\n' +
    '    <tbody ng-if="iuiTable.serverSideSorting && iuiTable.rowData.length">\n' +
    '      <tr\n' +
    '        ng-repeat="row in iuiTable.rowData | startFrom:(iuiTable.pagingOption.currentPage-1)*iuiTable.pagingOption.pageSize | limitTo:iuiTable.pagingOption.pageSize"\n' +
    '        ng-include="(iuiTable.rowTemplate)?iuiTable.rowTemplate:iuiTable.settings.defaultRowTemplate">\n' +
    '      </tr>\n' +
    '    </tbody>\n' +
    '    <tbody ng-if="!iuiTable.rowData || iuiTable.rowData.length == 0">\n' +
    '      <tr>\n' +
    '        <td colspan="{{iuiTable.displayColumns.length}}">\n' +
    '          <span ng-if="!iuiTable.emptyRowDataMessage">{{iuiTable.settings.labels.emptyMessage}}</span>\n' +
    '          <span ng-if="iuiTable.emptyRowDataMessage">{{iuiTable.emptyRowDataMessage}}</span>\n' +
    '        </td>\n' +
    '      </tr>\n' +
    '    </tbody>\n' +
    '  </table>\n' +
    '  <iui-pager\n' +
    '    ng-if="iuiTable.rowData.length > 0 && !iuiTable.hideTablePager"\n' +
    '    page="iuiTable.pagingOption.currentPage"\n' +
    '    page-size="iuiTable.pagingOption.pageSize"\n' +
    '    total-records="iuiTable.rowData.length">\n' +
    '  </iui-pager>\n' +
    '</div>\n' +
    '');
}]);
})();
