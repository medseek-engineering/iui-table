angular.module('pagination', ['template/pagination/pagination.html'])

.controller('PaginationController', ['$scope', '$attrs', '$parse', '$interpolate', function ($scope, $attrs, $parse, $interpolate) {
  'use strict';
  var self = this;
  //setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

  this.init = function (defaultItemsPerPage) {
    if ($attrs.itemsPerPage) {
      $scope.$parent.$watch($parse($attrs.itemsPerPage), function (value) {
        self.itemsPerPage = parseInt(value, 10);
        $scope.totalPages = self.calculateTotalPages();
      });
    } else {
      this.itemsPerPage = defaultItemsPerPage;
    }
  };


  this.noPrevious = function () {
    return this.page === 1;
  };
  this.noNext = function () {
    return this.page === $scope.totalPages;
  };

  this.isActive = function (page) {
    return this.page === page;
  };

  this.calculateTotalPages = function () {
    var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  };

  this.getAttributeValue = function (attribute, defaultValue, interpolate) {
    return angular.isDefined(attribute) ? (interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute)) : defaultValue;
  };

  this.render = function () {

    this.page = parseInt($scope.page, 10) || 1;
    if (this.page > 0 && this.page <= $scope.totalPages) {
      $scope.pages = this.getPages(this.page, $scope.totalPages);
    }
  };

  $scope.selectPage = function (page) {
    if (!self.isActive(page) && page > 0 && page <= $scope.totalPages) {
      $scope.page = page;
      $scope.onSelectPage({ page: page });
    }
  };

  $scope.setNoOfPages = function (no) {
    this.itemsPerPage = $scope.numPages = no;
    $scope.totalPages = Math.max(this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage) || 0, 1);
    self.render();
  };

  $scope.$watch('page', function (newVal, oldVal)
  {
    if (newVal!=='' && !isNaN(parseInt(newVal)) && oldVal !== newVal) {
      self.render();
    }
  });

  $scope.$watch('totalItems', function () {
    $scope.totalPages = self.calculateTotalPages();
  });
  $scope.$watch('setNumberOfPages', function () {
    if($scope.setNumberOfPages){
      self.itemsPerPage = parseInt($scope.setNumberOfPages, 10);
    }
    $scope.totalPages = self.calculateTotalPages();
    self.render();
  });

  $scope.$watch('totalPages', function (value) {

    // setNumPages($scope.$parent, value); // Readonly variable

    if (self.page > value) {
      $scope.selectPage(value);
    } else {
      self.render();
    }
  });
}])

.constant('paginationConfig', {
  itemsPerPage: 10,
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: true
})

.directive('msPagination', ['$parse', 'paginationConfig', function ($parse, config) {
  'use strict';
  return {
    restrict: 'EA',
    scope: {
      page: '=',
      totalItems: '=',
      pageOption: '=',
      numPages: '=',
      setNumberOfPages: '=',
      onSelectPage: ' &'
    },
    controller: 'PaginationController',
    templateUrl: 'template/pagination/pagination.html',
    replace: true,
    link: function (scope, element, attrs, paginationCtrl) {

      // Setup configuration parameters
      var maxSize,
      boundaryLinks = paginationCtrl.getAttributeValue(attrs.boundaryLinks, config.boundaryLinks),
      directionLinks = paginationCtrl.getAttributeValue(attrs.directionLinks, config.directionLinks),
      firstText = paginationCtrl.getAttributeValue(attrs.firstText, config.firstText, true),
      previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, true),
      nextText = paginationCtrl.getAttributeValue(attrs.nextText, config.nextText, true),
      lastText = paginationCtrl.getAttributeValue(attrs.lastText, config.lastText, true),
      rotate = paginationCtrl.getAttributeValue(attrs.rotate, config.rotate);
      paginationCtrl.init(config.itemsPerPage);

      scope.totalItemsText = attrs.totalItemsText || 'Total Items';
      if (attrs.maxSize) {
        scope.$parent.$watch($parse(attrs.maxSize), function (value) {
          maxSize = parseInt(value, 10);
          paginationCtrl.render();
        });
      }

      // Create page object used in template
      function makePage(number, text, isActive, isDisabled) {
        return {
          number: number,
          text: text,
          active: isActive,
          disabled: isDisabled
        };
      }

      paginationCtrl.getPages = function (currentPage, totalPages) {
        var pages = [];
        // Default page limits
        var startPage = 1, endPage = totalPages;
        var isMaxSized = (angular.isDefined(maxSize) && maxSize < totalPages);

        // recompute if maxSize
        if (isMaxSized) {
          if (rotate) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
            endPage = startPage + maxSize - 1;

            // Adjust if limit is exceeded
            if (endPage > totalPages) {
              endPage = totalPages;
              startPage = endPage - maxSize + 1;
            }
          } else {
            // Visible pages are paginated with maxSize
            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

            // Adjust last page if limit is exceeded
            endPage = Math.min(startPage + maxSize - 1, totalPages);
          }
        }

        // Add page number links
        //for (var number = startPage; number <= endPage; number++) {
        var page = makePage(startPage, 'TextBox', paginationCtrl.isActive(startPage), false);
        pages.push(page);
        // }

        /*// Add links to move between page sets
        if (isMaxSized && !rotate) {
          if (startPage > 1) {
            var previousPageSet = makePage(startPage - 1, '...', false, false);
            pages.unshift(previousPageSet);
          }

          if (endPage < totalPages) {
            var nextPageSet = makePage(endPage + 1, '...', false, false);
            pages.push(nextPageSet);
          }
        }*/

        // Add previous & next links
        if (directionLinks) {
          var previousPage = makePage(currentPage - 1, previousText, false, paginationCtrl.noPrevious());
          pages.unshift(previousPage);

          var nextPage = makePage(currentPage + 1, nextText, false, paginationCtrl.noNext());
          pages.push(nextPage);
        }

        // Add first & last links
        if (boundaryLinks) {
          var firstPage = makePage(1, firstText, false, paginationCtrl.noPrevious());
          pages.unshift(firstPage);
          var lastPage = makePage(totalPages, lastText, false, paginationCtrl.noNext());
          pages.push(lastPage);
        }

        return pages;
      };
    }
  };
}]);

angular.module('template/pagination/pagination.html', []).run(['$templateCache', function ($templateCache) {
  'use strict';
  $templateCache.put('template/pagination/pagination.html',
    ' <div class=\"iui-pagination clearfix\" > ' +
     ' <div class=\"pull-left\" >' +
        '<span class=\"iui-pagination-total-items \">{{totalItemsText}}: {{totalItems}}</span>' +
      '</div>' +
      '<ul class=\"custom-pagination list-unstyled\" ng-show=\"pages[4].number > 1\"> ' +
       '<li  ng-class=\"{active: pages[0].active, disabled: pages[0].disabled}\" > ' +
            '<button ng-disabled=\"pages[0].disabled\" ng-class=\"{pagerDisabled: pages[0].disabled}\" class=\"pager-button  pull-left margin-right-5\"  ng-click=\"selectPage(pages[0].number)\"><i class=\"glyphicon glyphicon-step-backward\"><span class=\"sr-only\">First Page</span></i></button>' +
          '</li>' +
        '<li  ng-class=\"{active: pages[1].active, disabled: pages[1].disabled}\" > ' +
            '<button ng-disabled=\"pages[1].disabled\" ng-class=\"{pagerDisabled: pages[1].disabled}\" class=\"pager-button  pull-left margin-right-5\"  ng-click=\"selectPage(pages[1].number)\"><i class=\"pager-back-img\"></i><span class=\"sr-only\">Previous Page</span></button>' +
          '</li>' +
          '<li><div class=\"clearfix\">' +
            '<label><span class=\"sr-only\">Current Page</span><input class=\"form-control pagination-current-page\" onkeypress=\"return isNumber(event)\" type=\"text\" ng-model=\"page\"></label>' +
            '<span class=\"pagination-total-pages \">/ {{pages[4].number}}</span>' +
          '</div></li>' +
        '<li  ng-class=\"{active: pages[3].active, disabled: pages[3].disabled}\" > ' +
            '<button ng-disabled=\"pages[3].disabled\" ng-class=\"{pagerDisabled: pages[3].disabled}\" class=\"pager-button  pull-left margin-right-5\"  ng-click=\"selectPage(pages[3].number)\"><i class=\"glyphicon glyphicon-play\"></i><span class=\"sr-only\">Next Page</span></button>' +
          '</li>' +
        '<li  ng-class=\"{active: pages[4].active, disabled: pages[4].disabled}\" > ' +
            '<button ng-disabled=\"pages[4].disabled\" ng-class=\"{pagerDisabled: pages[4].disabled}\" class=\"pager-button  pull-left\"  ng-click=\"selectPage(pages[4].number)\"><i class=\"glyphicon glyphicon-step-forward\"></i><span class=\"sr-only\">Last Page</span></button>' +
          '</li>' +
     '</ul>' +
    '</div>'

    );
}]);
