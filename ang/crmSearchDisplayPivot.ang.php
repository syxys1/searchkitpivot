<?php
// This file declares an Angular module which can be autoloaded
// in CiviCRM. See also:
// \https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_angularModules/n
return [
  'js' => [
    'ang/crmSearchDisplayPivot.js',
    'ang/crmSearchDisplayPivot/*.js',
    'ang/crmSearchDisplayPivot/*/*.js',
  ],
  'css' => [
    'ang/crmSearchDisplayPivot.css',
  ],
  'partials' => [
    'ang/crmSearchDisplayPivot',
  ],
  'requires' => [
    'crmUi',
    'crmSearchDisplay',
    'crmSearchAdmin',
    'ui.bootstrap', 
  ],
  'bundles' => ['bootstrap3',
  ],
  'basePages' => ['civicrm/search', 'civicrm/admin/search',
  ],
  'exports' => [
    'crm-search-display-pivot' => 'E',
  ],
  'settings' => [],
];
