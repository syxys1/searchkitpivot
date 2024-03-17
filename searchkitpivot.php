<?php

require_once 'searchkitpivot.civix.php';
// phpcs:disable
use CRM_Searchkitpivot_ExtensionUtil as E;
// phpcs:enable

/**
 * Implements hook_civicrm_config().
 *
 * @link https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_config/
 */
function searchkitpivot_civicrm_config(&$config): void {
  _searchkitpivot_civix_civicrm_config($config);
}

/**
 * Implements hook_civicrm_install().
 *
 * @link https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_install
 */
function searchkitpivot_civicrm_install(): void {
  _searchkitpivot_civix_civicrm_install();
}

/**
 * Implements hook_civicrm_enable().
 *
 * @link https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_enable
 */
function searchkitpivot_civicrm_enable(): void {
  _searchkitpivot_civix_civicrm_enable();
}
