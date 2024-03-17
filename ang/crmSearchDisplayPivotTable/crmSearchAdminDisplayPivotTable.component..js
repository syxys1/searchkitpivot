(function(angular, $, _) {
  "use strict";

  angular.module('crmSearchAdmin').component('crmSearchAdminDisplayPivotTable', {
    bindings: {
      display: '<',
      apiEntity: '<',
      apiParams: '<'
    },
    require: {
      parent: '^crmSearchAdminDisplay',
      crmSearchAdmin: '^crmSearchAdmin'
    },
    templateUrl: '~/crmSearchAdmin/displays/searchAdminDisplayTable.html',
    controller: function($scope, searchMeta, formatForSelect2, crmUiHelp) {
      const ts = $scope.ts = CRM.ts('org.civicrm.search_kit'),
        ctrl = this;
      $scope.hs = crmUiHelp({file: 'CRM/Search/Help/Display'});

      this.tableClasses = [
        {name: 'table', label: ts('Row Borders')},
        {name: 'table-bordered', label: ts('Column Borders')},
        {name: 'table-striped', label: ts('Even/Odd Stripes')},
        {name: 'crm-sticky-header', label: ts('Sticky Header')}
      ];

      // Check if array contains item
      this.includes = _.includes;

      // Add or remove an item from an array
      this.toggle = function(collection, item) {
        if (_.includes(collection, item)) {
          _.pull(collection, item);
        } else {
          collection.push(item);
        }
      };

      this.toggleDraggable = function() {
        if (ctrl.display.settings.draggable) {
          delete ctrl.display.settings.draggable;
        } else {
          ctrl.display.settings.sort = [];
          ctrl.display.settings.draggable = searchMeta.getEntity(ctrl.apiEntity).order_by;
        }
      };

      this.getColTypes = () => ctrl.parent.colTypes;
/**
      this.getLabelForFields = (fields) => ({
        'aFirstF': ts('First'),
        'aSecondF': ts('Second'),
        'popupHtml': ts('Popup HTML')
      }[fields]);

      this.getAcceptableDataTypesForFields = (fields) => ({
        'aFirstF': ['Text'],
        'aSecondF': ['Text'],
        'popupHtml': null,
      }[fields])
      
      this.getColumnOptionsForFields = (fields) => {
        const acceptableTypes = ctrl.getAcceptableDataTypesForFields(fields);

        return acceptableTypes ? ctrl.allColumns.filter(
          (col) => acceptableTypes.includes(col.dataType)
        ) : ctrl.allColumns;
      };

      this.initColumnForFields = (fields) => {
        // all acceptable columns
        const acceptable = ctrl.getColumnOptionsForFields(fields);

        // dont set if already used in another column
        const alreadyUsedKeys = (ctrl.display.settings && ctrl.display.settings.columns)
          ?
          ctrl.display.settings.columns.map((col) => col.key)
          :
          [];

        const available = acceptable.filter((col) => (!alreadyUsedKeys.includes(col.key)));

        // choose the first found or create empty
        const col = available.length > 0 ? available[0] : { key: '' };
        col.mapTo = fields;
        return col;
      };
**/
      this.$onInit = function () {
        
        if (!ctrl.display.settings) {
          ctrl.display.settings = _.extend({}, _.cloneDeep(CRM.crmSearchAdmin.defaultDisplay.settings), {columns: null, pager: {}});
          ctrl.display.settings.sort = ctrl.parent.getDefaultSort();
        }
        // Displays created prior to 5.43 may not have this property
        ctrl.display.settings.classes = ctrl.display.settings.classes || [];
        // Table can be draggable if the main entity is a SortableEntity.
        ctrl.canBeDraggable = _.includes(searchMeta.getEntity(ctrl.apiEntity).type, 'SortableEntity');
        ctrl.parent.initColumns({label: true, sortable: true});
/**        
        if (!ctrl.display.settings.columns) {
          // push sequentially to avoid getting fixed as the same object
          ctrl.display.settings.columns = [];
          ctrl.display.settings.columns.push(ctrl.initColumnForFields('aFirstF'));
          ctrl.display.settings.columns.push(ctrl.initColumnForFields('aSecondF'));
          ctrl.display.settings.columns.push(ctrl.initColumnForFields('popupHtml'));
        }
**/
      };

      this.toggleTally = function() {
        if (ctrl.display.settings.tally) {
          delete ctrl.display.settings.tally;
          _.each(ctrl.display.settings.columns, function(col) {
            delete col.tally;
          });
        } else {
          ctrl.display.settings.tally = {label: ts('Total')};
          _.each(ctrl.display.settings.columns, function(col) {
            if (col.type === 'field') {
              col.tally = {
                fn: searchMeta.getDefaultAggregateFn(searchMeta.parseExpr(ctrl.parent.getExprFromSelect(col.key)))
              };
            }
          });
        }
      };

      this.getTallyFunctions = function() {
        var allowedFunctions = _.filter(CRM.crmSearchAdmin.functions, function(fn) {
          return fn.category === 'aggregate' && fn.params.length;
        });
        return {results: formatForSelect2(allowedFunctions, 'name', 'title', ['description'])};
      };

    }
  });

})(angular, CRM.$, CRM._);
