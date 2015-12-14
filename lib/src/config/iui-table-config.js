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