(function () {
  'use strict';

  describe('iui-table directive', function () {
    var scope,
      element,
      el;

    beforeEach(function () {
      module('app');
      module('templates');
    });

    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.displayColumns = [
        {
          field: 'firstName',
          displayName: 'First Name'
        },
        {
          field: 'lastName',
          displayName: 'Last Name'
        }
      ];
      scope.rowData = [
        {
          firstName: 'Maxwell',
          lastName: 'Smart',
          agent: 'dontshowme01'
        },
        {
          firstName: 'Agent',
          lastName: '99'
        },
        {
          firstName: 'The',
          lastName: 'Chief'
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

      it('contains a single <tbody>', function () {
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

      it('third row second column is Chief', function () {
        expect(el.find('td').eq(5).text().trim()).toBe('Chief');
      });
    });
    it('only shows data defined in the columnDefintion ARRAY', function () {
      var stringified = JSON.stringify(el);
      var search = stringified.search('dontshowme01');
      //This method returns -1 if no match is found.
      expect(search).toBe(-1);
    });
    
  });
}(window.app));