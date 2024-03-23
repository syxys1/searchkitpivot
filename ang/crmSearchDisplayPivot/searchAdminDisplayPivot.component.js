(function(angular, $, _) {
    "use strict";
  
    angular.module('crmSearchAdmin').component('searchAdminDisplayPivot', {
      bindings: {
        display: '<',
        apiEntity: '<',
        apiParams: '<'
      },
      require: {
        parent: '^crmSearchAdminDisplay',
        crmSearchAdmin: '^crmSearchAdmin'
      },
      templateUrl: '~/crmSearchDisplayPivot/searchAdminDisplayPivot.html',
      controller: function($scope, searchMeta, crmUiHelp) {
        const ts = $scope.ts = CRM.ts('org.civicrm.search_kit'),
          ctrl = this;
        $scope.hs = crmUiHelp({file: 'CRM/Search/Help/Display'});

        // init in $onInit
        this.allColumns = [];

        this.getDefaultSettings = () => ({
          format: {
            height: 480,
            width: 768
          }
        });

        // is this useful?
        this.getColTypes = () => ctrl.parent.colTypes;

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


        this.$onInit = function () {
          ctrl.allColumns = ctrl.apiParams.select.map((col) => searchMeta.fieldToColumn(col, {label: true}));

          if (!ctrl.display.settings) {
            ctrl.display.settings = this.getDefaultSettings();
          }
          if (!ctrl.display.settings.columns) {
            // push sequentially to avoid getting fixed as the same object
            ctrl.display.settings.columns = [];
            ctrl.display.settings.columns.push(ctrl.initColumnForFields('aFirstF'));
            ctrl.display.settings.columns.push(ctrl.initColumnForFields('aSecondF'));
            ctrl.display.settings.columns.push(ctrl.initColumnForFields('popupHtml'));
          }
        };
  
      }
    });
  
  })(angular, CRM.$, CRM._);
  