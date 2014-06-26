<?php
function getBlock($id) {

  $id = urldecode($id);
  $parts = explode(':', $id);
  $module = $parts[0];
  $delta = $parts[1];
  //mymodule+philosophy_slider
  $blocks = array(
    block_load($module, $delta)
  );
  //$something = block_custom_block_get($block->nid);
  $block_info = _block_render_blocks($blocks);
  //$something = _block_get_renderable_array($block);
  // $renderable = _block_get_renderable_array(_block_render_blocks(array($block)));
  // $renderable[$module . '_' . $delta]['#markup']['subject'] = $renderable[$module . '_' . $delta]['#block']->subject;
  // $output = $renderable[$module . '_' . $delta]['#markup'];

  $output = $block_info[$module . '_' . $delta]->content['#markup'];

  //return $block_info;
  return $output;

}