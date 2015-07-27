(function () {
  'use strict';

  describe('iui-table directive', function () {
    var scope,
      element,
      el,
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
          displayName: 'Code Name'
        },
        {
          field: 'agency',
          displayName: 'Agency'
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
      element = angular.element('<iui-table row-data="rowData" display-columns="displayColumns"></iui-table>');
      el = $compile(element)(scope);
      scope.$digest();

    }));
    describe('is a semantic table structure', function () {
      it('contains a single <table>', function () {
        expect(el.find('table').length).toBe(1);
      });

      it('contains a single <thead>', function () {
        expect(el.find('thead').length).toBe(1);
      });

      it('has a <tbody>', function () {
        expect(el.find('tbody').length).toBe(1);
      });

    });
    describe('can display a 2 column table with 3 rows of data', function () {
      it('contains two <th>', function () {
        expect(el.find('th').length).toBe(2);
      });

      it('contains four <tr>', function () {
        expect(el.find('tr').length).toBe(4);
      });

      it('contains six <td>', function () {
        expect(el.find('td').length).toBe(6);
      });

      it('third row second column is KAOS', function () {
        expect(el.find('td').eq(5).text().trim()).toBe('KAOS');
      });

      it('pagination controls are not visible', function () {
        expect(el.find('ul').length).toBe(0);
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
        
      });

      it('<table> should contain 11 <tr>', function () {
        // one tr is in the thead
        expect(el.find('tr').length).toBe(11);
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
          var nextButton = el.find('button').eq(2);
          nextButton.triggerHandler('click');
          expect(el.find('tr').length).toBe(4);
        });

        it('should display the previous page of results when the Previous button is pressed', function() {
          var previousButton = el.find('button').eq(1);
          previousButton.triggerHandler('click');
          expect(el.find('tr').length).toBe(11);
        });

        //TODO: Last Page & First Page buttons & Inputing Custom Page Number
      });
    });
    
  });
}(window.app));