# iui-table
Angular dynamic table directive

[http://medseek-engineering.github.io/iui-table/style-guide](iui-table Examples)


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