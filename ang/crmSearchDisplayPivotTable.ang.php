<?php
// This file declares an Angular module which can be autoloaded
// in CiviCRM. See also:
// \https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_angularModules/n
return [
  'js' => [
    'ang/crmSearchDisplayPivotTable.js',
    'ang/crmSearchDisplayPivotTable/*.js',
  ],
  'partials' => [
    'ang/crmSearchDisplayPivotTable',
  ],
//  'css' => ['css/crmSearchDisplayPivotTable.css',
//  ],
  'basePages' => ['civicrm/search', 'civicrm/admin/search',
  ],
  'requires' => ['crmSearchDisplay', 'crmUi', 'ui.bootstrap', 'crmSearchAdmin',
  ],
  'bundles' => ['bootstrap3',
  ],
  'exports' => ['crm-search-display-pivot' => 'E',
  ],
  'settingsFactory' => ['\Civi\Searchkitpivot\Utils', 'getSettings',
  ],
];
