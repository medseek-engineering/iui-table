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

Add 'pagination' as a module dependency in includeDependencies.js
```javascript
app.ng.requires.push('pagination');
```


## Usage

Adding the iui-table directive to your markup:
```javascript
  scope.data = [
    {
      firstName: 'Joe',
      lastName: 'Smith'
    },
    {
      firstName: 'Janet',
      lastName: 'Doe'
    }
  ];

  scope.gridColumns = [
    {
      field: 'firstName',
      displayName: 'First Name',
      columnClass: 'table-column-first-name'
    },
    {
      field: 'lastName',
      displayName: 'Last Name',
      headerCellTemplate: 'templates/url-of-header-template.html'
    }
  ];

  scope.sortingOptions = {
    field: 'lastName',
    reverse: false
  };
```
```html
<iui-table 
  display-columns="gridColumns" 
  row-data="data" 
  hide-table-pager="false" 
  row-template="'/modules/request-center/templates/requests-row.html'" 
  sorting-options="sortingOption" 
  table-class="'table-names'" 
  table-caption="Table of Names"
  hide-table-caption="false"
  server-side-sorting="false"></iui-table>
```

## Directive Attributes

<dl>
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
	<dt>serverSideSorting</dt>
	<dd><code>Boolean</code> - if there is server side sorting set to true</dd>
</dl>