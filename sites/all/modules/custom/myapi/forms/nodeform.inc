<?php
/**
 * Implements hook_form_FORM_ID_alter().
 */
function myapi_form_node_form_alter(&$form, $form_state, $form_id) {

  $node = $form['#node'];
  //dpm($node);
  //$nid = $node->nid;

  $form['data_settings'] = array(
    '#type' => 'vertical_tabs',
    '#weight' => 99
  );

  /**
   * VIEWS
   */
  $views = views_get_all_views();
  $options_views = array(
    0 => t('none')
  );
  foreach ($views as $view) {
    $options_views[$view->name] = t($view->name);
  }

  $form['view_data'] = array(
    '#type' => 'fieldset',
    '#title' => t('View Data'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    // '#group' => 'additional_settings',
    '#group' => 'data_settings',
    '#weight' => 100,
  );

  if (isset($form['assoc_views'])) {
    $assoc_views_default = array();
    if (isset($node->assoc_views)) {
      $assoc_views_field = field_view_field('node', $node, 'assoc_views');
      if (isset($assoc_views_field['#items'][0]['value'])) {
        $assoc_views_default = explode('+', $assoc_views_field['#items'][0]['value']);
      }
    }

    //replace the created field for my own version
    $assoc_views_lang = $form['assoc_views']['#language'];
    //dpm($form['assoc_views'][$assoc_views_lang]);
    $form['assoc_views'][$assoc_views_lang]['#title'] = "views to use";
    $form['assoc_views'][$assoc_views_lang]['#type'] = 'select';
    $form['assoc_views'][$assoc_views_lang]['#multiple'] = TRUE;
    $form['assoc_views'][$assoc_views_lang]['#options'] = $options_views;
    $form['assoc_views'][$assoc_views_lang]['#default_value'] = $assoc_views_default;
    $form['assoc_views'][$assoc_views_lang]['#description'] = t('the views that this node will use');

    $form['view_data']['assoc_views'] = $form['assoc_views'];
    unset($form['assoc_views']);

  }

  /**
   * BLOCKS
   */
  $form['block_data'] = array(
    '#type' => 'fieldset',
    '#title' => t('Block Data'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    // '#group' => 'additional_settings',
    '#group' => 'data_settings',
    '#weight' => 101,
  );

  global $theme;
  $all_blocks = _block_rehash($theme);

  $options_blocks = array(
    0 => t('none')
  );
  foreach ($all_blocks as $block) {
    if ($block['module'] !== 'system' && $block['module'] !== 'devel' && $block['module'] !== 'views') {
      $options_blocks[$block['module'] . ':' . $block['delta']] = $block['delta'];
    }
  }

  dpm($options_blocks);

  if (isset($form['assoc_blocks'])) {
    $assoc_blocks_default = array();
    if (isset($node->assoc_blocks)) {
      $assoc_blocks_field = field_view_field('node', $node, 'assoc_blocks');
      if (isset($assoc_blocks_field['#items'][0]['value'])) {
        $assoc_blocks_default = explode('+', $assoc_blocks_field['#items'][0]['value']);
      }
    }

    //replace the created field for my own version
    $assoc_blocks_lang = $form['assoc_blocks']['#language'];
    //dpm($form['assoc_views'][$assoc_views_lang]);
    $form['assoc_blocks'][$assoc_blocks_lang]['#title'] = "blocks to use";
    $form['assoc_blocks'][$assoc_blocks_lang]['#type'] = 'select';
    $form['assoc_blocks'][$assoc_blocks_lang]['#multiple'] = TRUE;
    $form['assoc_blocks'][$assoc_blocks_lang]['#options'] = $options_blocks;
    $form['assoc_blocks'][$assoc_blocks_lang]['#default_value'] = $assoc_blocks_default;
    $form['assoc_blocks'][$assoc_blocks_lang]['#description'] = t('the blocks that this node will use');

    $form['block_data']['assoc_blocks'] = $form['assoc_blocks'];
    unset($form['assoc_blocks']);

  }

}


function myapi_node_submit($node, $form, &$form_state) {
  $lang = $form['language']['#value'];
  //combine the values with plus signs to store for api call
  $combined = array();

  //add conditionals to check for assoc_views...ONLY PAGES HAVE THESE!!
  //add conditionals to check for assoc_blocks...ONLY PAGES HAVE THESE!!

  foreach($form_state['values']['assoc_views'][$lang] as $key) {
    $combined[] = $key['value'];
  }
  $combined = implode('+', $combined);
  //dpm($combined);
  $node->assoc_views[$lang] = array(
    0 => array (
      'value' => $combined
    )
  );

  dpm($node);

}

// function myapi_field_attach_submit($entity_type, $entity, $form, &$form_state) {
//   dpm($form);
//   $lang = $form['language']['#value'];
//   $form_state['values']['assoc_views'][$lang][0]['value'] = 'changed!';
// }
