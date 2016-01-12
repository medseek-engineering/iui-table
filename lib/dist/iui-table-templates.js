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
