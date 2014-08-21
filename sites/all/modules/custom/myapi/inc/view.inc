<?php
/**
 * Returns a view object
 *
 * @Resource URL
 * /api/view/ [sample: /api/view/articles]
 *
 * @param $name
 * name of the view
 * @param $page
 * page number for the view if paginated
 */
function getViews($name, $page = 0) {

  $name = urldecode($name);
  $names = explode(' ', $name);

  $rows = array();
  foreach ($names as $name) {
    $view = views_get_view($name);

    if (isset($view)) {
      $view->init_display();
      $view->current_page = $page;

      $view->pre_execute();
      $view->execute();
      $view_result = $view->result;

      $rows = array();
      $rid = 1;
      foreach ($view_result as $row) {
        if (isset($row->nid)) {
          $alias = drupal_get_path_alias('node/' . $row->nid);
          $rows[$rid] = $row;
          $rows[$rid]->alias = $alias;
          $rows[$rid]->pos = $rid;
          $rows[$rid]->node_created = format_date($rows[$rid]->node_created, 'custom', "m-d-Y");
          if (isset($rows[$rid]->field_field_image)) {
            $rows[$rid]->field_field_image = (isset($rows[$rid]->field_field_image[0]['raw']))? file_create_url($rows[$rid]->field_field_image[0]['raw']['uri']) : FALSE;
          }
          $rid++;
        }
      }

      $views[$name] = $rows;
    }
    else {
      return;
    }
  }

  return $views;

  // foreach($names as $name) {
  //
  //   $view = views_get_view($name);
  //
  //   $view->init_display();
  //   $view->current_page = $page;
  //
  //   $view->pre_execute();
  //   $view->execute();
  //   $view_result = $view->result;
  //
  //   $rows = array();
  //   foreach ($view_result as $row) {
  //     $rows[$row->nid] = $row;
  //   }
  //
  // }

  // $view = views_get_view($name);
  //
  // $view->init_display();
  // $view->current_page = $page;
  //
  // $view->pre_execute();
  // $view->execute();
  // $view_result = $view->result;
  //
  // $rows = array();
  // foreach ($view_result as $row) {
  //   $rows[$row->nid] = $row;
  // }
  //
  // return $rows;

}
