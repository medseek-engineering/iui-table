# iui-table
Angular dynamic table directive

[iui-table Examples](http://medseek-engineering.github.io/iui-table/style-guide/ "iui-table Examples")


## Setup

Add to package.json:
```javascript
"dependencies": {
    ...
    "iui-table": "git+ssh://git@github.com:medseek-engineering/iui-table.git"
}
```


## Installation (with Influence Health ui-core)

Use in app.js:
```javascript
ui.use(require('iui.table'));
```


## Installation (without ui-core / typical)

Everything you need is already minified
node_modules/iui-table/dist/iui-table.min.js

As soon as you've got the file included in your page you just need to declare a dependency on the iui.table module:
angular.module('myModule', ['iui.table']);

## Build
**Note:** if you make changes, you must run **gulp** to rebuild the combined files in the 'dist' directory. You may need to also update the package.json version number.

## Changelog

### 1.0.14
- Fixed issues where number in pagination field was not updating when custom page number entered
- Add .form-control class to number input to show validation state

### 1.0.13

- Fixed issue where tbody would not show if rowData is greater than 1. Changed display logic to check iuiTable.rowData.length instead of iuiTable.rowData

### 1.0.12
- Added a default message when the table is empty.
- Created a variable to override the default empty table message.

### 1.0.11
- Fixed bug where current page wouldn't reset when going to a new page.

### 1.0.10
- Adding ability to customize the labels (like .sr-only text)

### 1.0.9

-  Add ability to toggle between visible columns
- Add an angular filter that displays any columns where .visible is not
false. Adding visible: false to the columnDef will hide that column
initially. Use the ng-model of a checkbox to toggle the visible columns

### 1.0.8

-  Update var name to correct spelling

### 1.0.7

- moving src files to src folder
- including responsive table classes
- implementing hologram
- moving documentation to style guide
- moving .jshint config to source from iui-general

### 1.0.6

making changes to templates

### 1.0.0

Created iui-table repo
