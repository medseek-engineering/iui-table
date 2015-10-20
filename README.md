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
