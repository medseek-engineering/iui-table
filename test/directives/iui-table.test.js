(function () {
  'use strict';

  describe('iui-table directive', function () {
    var scope,
      element,
      el,
      iuiTable = {},
      pagination = {},
      additionalCharacters = [
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
        }
      ];

    beforeEach(function () {
      module('app');
      //pagination module must be included as a project dependency.
      module('pagination');
      module('templates');
    });

    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.displayColumns = [
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
      scope.rowData = [
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
        }
      ];
      element = angular.element('<iui-table row-data="rowData" display-columns="displayColumns" table-class="\'custom-class-1 customClass2\'"></iui-table>');
      el = $compile(element)(scope);
      scope.$digest();
      iuiTable.tableElements = el.find('table');
      iuiTable.theadElements = el.find('thead');
      iuiTable.tbodyElements = el.find('tbody');
      iuiTable.trElements = el.find('tr');
      iuiTable.thElements = el.find('th');
      iuiTable.tdElements = el.find('td');
    }));
    describe('is a semantic table structure', function () {
      it('contains a single <table>', function () {
        expect(iuiTable.tableElements.length).toBe(1);
      });

      it('contains a single <thead>', function () {
        expect(iuiTable.theadElements.length).toBe(1);
      });

      it('has a <tbody>', function () {
        expect(iuiTable.tbodyElements.length).toBe(1);
      });

    });
    describe('can be customized', function () {
      it('<table> can have multiple CSS classes passed in', function () {
        expect(iuiTable.tableElements.eq(0).hasClass('custom-class-1')).toBe(true);
        expect(iuiTable.tableElements.eq(0).hasClass('customClass2')).toBe(true);
      });
      it('<th> has a class name based on the field \'iui-table-header-{{columnHeader.field}}\'', function () {
        //iui-table-header-{{column.field}}
        expect(iuiTable.thElements.eq(0).hasClass('iui-table-header-codename')).toBe(true);
        expect(iuiTable.thElements.eq(1).hasClass('iui-table-header-agency')).toBe(true);
        // testing lowercase filter
        expect(iuiTable.thElements.eq(0).hasClass('iui-table-header-codeName')).toBe(false);
      });
      it('<td> has a class name based on the field \'iui-table-{{column.field}}\'', function () {
        //iui-table-header-{{column.field}}
        expect(iuiTable.tdElements.eq(0).hasClass('iui-table-codename')).toBe(true);
        expect(iuiTable.tdElements.eq(1).hasClass('iui-table-agency')).toBe(true);
        // testing lowercase filter
        expect(iuiTable.tdElements.eq(0).hasClass('iui-table-codeName')).toBe(false);
      });
      it('<th> has a custom class', function () {
        //code-name-custom-class agencyCustomClass
        expect(iuiTable.thElements.eq(0).hasClass('code-name-custom-class')).toBe(true);
        expect(iuiTable.thElements.eq(1).hasClass('agencyCustomClass')).toBe(true);
        expect(iuiTable.thElements.eq(1).hasClass('AgencyCustomClass')).toBe(false);
      });
      it('<td> has a custom class', function () {
        //code-name-custom-class agencyCustomClass
        expect(iuiTable.tdElements.eq(0).hasClass('code-name-custom-class')).toBe(true);
        expect(iuiTable.tdElements.eq(1).hasClass('agencyCustomClass')).toBe(true);
        expect(iuiTable.tdElements.eq(1).hasClass('AgencyCustomClass')).toBe(false);
      });
    });
    describe('can display a 2 column table with 3 rows of data', function () {
      it('contains two <th>', function () {
        expect(iuiTable.thElements.length).toBe(2);
      });

      it('contains four <tr>', function () {
        expect(iuiTable.trElements.length).toBe(4);
      });

      it('contains six <td>', function () {
        expect(iuiTable.tdElements.length).toBe(6);
      });

      it('third row second column is KAOS', function () {
        expect(iuiTable.tdElements.eq(5).text().trim()).toBe('KAOS');
      });

      it('pagination controls are not visible', function () {
        expect(el.find('ul').length).toBe(0);
      });
    });
    describe('table header can have a custom template', function () {
      beforeEach(inject(function($templateCache) {
        var customCellTemplate = '<span class="sr-only">Zis is KAOS!</span><i aria-hidden="true" class="glyphicon glyphicon-star"></i>';
        $templateCache.put('/templates/custom-cell-template.html', customCellTemplate);
      }));
      beforeEach(function () {
        scope.displayColumns = [
          {
            field: 'codeName',
            displayName: 'Code Name'
          },
          {
            field: 'agency',
            displayName: 'Agency',
            headerCellTemplate: '/templates/custom-cell-template.html'
          }
        ];
        scope.$digest();
        iuiTable.thElements = el.find('th');
        iuiTable.icon = el.find('i').eq(0);
      });
      it('text from custom header cell template displays', function () {
        expect(iuiTable.thElements.eq(1).text().trim()).toBe('Zis is KAOS!');
      });
      it('icon from custom header cell template displays', function () {
        expect(iuiTable.icon.hasClass('glyphicon')).toBe(true);
        expect(iuiTable.icon.hasClass('glyphicon-star')).toBe(true);
        expect(iuiTable.icon.hasClass('KAOS')).toBe(false);
      });
    });
    describe('only shows data defined in the columnDefintion ARRAY', function () {
      it('should NEVER reveal Agent 86\'s name', function () {
        var elementStringified = JSON.stringify(el);
        var search1 = elementStringified.search('Maxwell');
        //This method returns -1 if no match is found.
        expect(search1).toBe(-1);
        var search2 = elementStringified.search('Smart');
        expect(search2).toBe(-1);
      });
    });
    describe('when the rowData has more than 10 entries', function () {
      // Pagination Tests
      beforeEach(function () {
        // Add additional Chacters to the list
        Array.prototype.push.apply(scope.rowData, additionalCharacters);
        scope.$digest();

        iuiTable.trElements = el.find('tr');
        iuiTable.thElements = el.find('th');
        iuiTable.tdElements = el.find('td');

        // Defining pagination control elements
        pagination.firstButton = el.find('button').eq(0);
        pagination.previousButton = el.find('button').eq(1);
        pagination.nextButton = el.find('button').eq(2);
        pagination.lastButton = el.find('button').eq(3);
      });

      it('<table> should contain 11 <tr>', function () {
        // one tr is in the thead
        expect(iuiTable.trElements.length).toBe(11);
      });

      describe('sorting - ', function () {
        it('clicking a table header should trigger a full data sort', function () {
          var secondColumnHeader = el.find('a').eq(1);
          secondColumnHeader.triggerHandler('click');
          expect(el.find('td').eq(1).text().trim()).toBe('KAOS');
          expect(el.find('td').eq(3).text().trim()).toBe('KAOS');
        });
        it('clicking the same table header should trigger a full data sort in the reverse direction', function () {
          var secondColumnHeader = el.find('a').eq(1);
          // First Click
          secondColumnHeader.triggerHandler('click');
          // Second Click
          secondColumnHeader.triggerHandler('click');
          expect(el.find('td').eq(1).text().trim()).toBe('CONTROL');
          expect(el.find('td').eq(3).text().trim()).toBe('CONTROL');
        });
      });


      describe('pagination - ', function () {

        it('should show controls', function () {
          // pagination control is in a ul
          expect(el.find('ul').length).toBe(1);
        });

        it('should display the next page of results when the Next button is pressed', function() {
          pagination.nextButton.triggerHandler('click');
          expect(el.find('tbody > tr').length).toBe(3);
        });

        it('next button and last page button should be disabled when on the last page', function () {
          var lastButton = el.find('button').eq(3);
          expect(pagination.nextButton.attr('disabled')).toBeFalsy();
          expect(lastButton.attr('disabled')).toBeFalsy();
          pagination.nextButton.triggerHandler('click');
          expect(pagination.nextButton.attr('disabled')).toBeTruthy();
          expect(lastButton.attr('disabled')).toBeTruthy();
        });

        it('should display the previous page of results when the Previous button is pressed', function() {
          pagination.nextButton.triggerHandler('click');
          pagination.previousButton.triggerHandler('click');
          expect(el.find('tr').length).toBe(11);
        });

        it('should display the first page of results when the First page button is pressed', function() {
          pagination.nextButton.triggerHandler('click');
          pagination.firstButton.triggerHandler('click');
          expect(el.find('tr').length).toBe(11);
        });

        it('should display the last page of results when the Last page button is pressed', function() {
          pagination.lastButton.triggerHandler('click');
          expect(el.find('tr').length).toBe(4);
        });

        it('previous button and first page button should be disabled when on the first page', function () {
          expect(pagination.previousButton.attr('disabled')).toBeTruthy();
          expect(pagination.firstButton.attr('disabled')).toBeTruthy();
          pagination.nextButton.triggerHandler('click');
          expect(pagination.previousButton.attr('disabled')).toBeFalsy();
          expect(pagination.firstButton.attr('disabled')).toBeFalsy();
        });

        //TODO: Inputing Custom Page Number
      });
    });
    
  });
}(window.app));