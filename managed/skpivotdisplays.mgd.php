<?php
use CRM_Searchkitpivot_ExtensionUtil as E;

return [
  [
    'name' => 'SearchDisplayType:pivot',
    'entity' => 'OptionValue',
    'cleanup' => 'always',
    'update' => 'always',
    'params' => [
      'version' => 4,
      'values' => [
        'option_group_id.name' => 'search_display_type',
        'value' => 'pivot',
        'name' => 'crm-search-display-pivot',
        'label' => E::ts('Pivot table'),
        'description' => E::ts('Displays results as a pivot table.'),
        'icon' => 'fa-table',
      ],
      'match' => ['option_group_id', 'name'],
    ],
  ],
];
