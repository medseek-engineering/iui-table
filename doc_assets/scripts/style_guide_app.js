var app = angular.module('styleGuideApp', ['iui.table']);
app.root = '/';

app.controller('SGMainCtrl', ['$scope', '$location', '$anchorScroll', '$window', function(scope, $location, $anchorScroll, $window) {
  
  // Fixes issue where anchor links were being rerouted
  scope.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  }

  // dynamic resizing of wrapper
  var w = angular.element($window);
  var header = $('.sg-header');
  var pageWrapper = $('.sg-wrapper');
  var theWindow = {};
  var pageSizes = {
    pageWrapperMargin: 10 // page-wrapper top margin
  };

  scope.monitorWindowHeight = function() {
    theWindow = {
      width: w.width(),
      height: w.height()
    };
    return theWindow;
  };

  var resizePageWrapper = function () {
    pageSizes.header = header.outerHeight();

    var newHeight =  pageSizes.windowHeight - pageSizes.header  - pageSizes.pageWrapperMargin;
    pageWrapper.css("min-height", newHeight);
  };

  /// Single page app problems...you gotta continually monitor what happens in pages
  scope.$watch(scope.monitorWindowHeight, function(newWindowSize) {
    pageSizes.windowHeight = newWindowSize.height;
    resizePageWrapper();
  }, true);

  /// Watches when the page resizes;
  w.on('resize', function(newWindowSize) {
    pageSizes.windowHeight = w.height();
    resizePageWrapper();
  });
}]);
