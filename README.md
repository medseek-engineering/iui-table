# iui-table
Angular dynamic table directive

## Setup

Add to package.json:
```javascript
"dependencies": {
    ...
    "iui-table": "git+ssh://git@github.com:medseek-engineering/iui-table.git"
}
```

Use in app.js:
```javascript
ui.use(require('iui-table'));
```

## Usage

Adding the iui-table directive to your markup:
```javascript
  scope.pagingData = [
    {
      field1: 'cell1',
      field2: 'cell2'
    },
    {
      field1: 'cell3',
      field2: 'cell4'
    }
  ];
  scope.gridColumns = [
   { field: 'field1', displayName: 'Column 1'},
   { field: 'field2', displayName: 'Column 2'}
  ];
  scope.sortingOptions = { field: 'LastActivity', reverse: true };
```
```html
<iui-table 
  display-columns="gridColumns" 
  row-data="pagingData" 
  hide-table-pager="false" 
  row-template="'/modules/request-center/templates/requests-row.html'" 
  sorting-options="pendingRequestSortingOption" 
  table-class="'card-on-sm-expanded'" 
  server-side-sorting="false"></iui-table>
```
<dl>
	<dt>displayColumns</dt>
	<dd><code>Array</code> - defines the columns in the grid</dd>
	<dt>rowData</dt>
	<dd><code>Array</code> - raw array of data. Only the data defined in the columns will show</dd>
	<dt>hideTablePager</dt>
	<dd><code>Boolean</code> - determines if the pagination at the bottom should show</dd>
	<dt>rowTemplate</dt>
	<dd><code>String</code> - allows a custom row template to be passed in</dd>
	<dt>sortingOptions</dt>
	<dd><code>Object</code> - with two properties field: <code>String</code> and reverse: <code>Boolean</code></dd>
	<dt>tableClass</dt>
	<dd><code>String</code> - passes in class to table. You can chain table classes like 'class1 class2'</dd>
	<dt>serverSideSorting</dt>
	<dd><code>Boolean</code> - if there is server side sorting set to true</dd>
</dl>