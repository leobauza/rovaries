<?php

// Provide < PHP 5.3 support for the __DIR__ constant.
if (!defined('__DIR__')) {
	define('__DIR__', dirname(__FILE__));
}

/**
 * implement template_preprocess_page()
 */
function stevenrovery_preprocess_page(&$vars) {

	//dpm($vars);
	if (isset($vars['node'])) {
		$node = $vars['node'];
		$vars['node_info'] = array(
			'nid' => $node->nid,
			'vid' => $node->vid,
			'title' => $node->title,
			'type' => $node->type
		);
	}

}

/**
 * Remove Drupal Css
 */
function stevenrovery_css_alter(&$css) {
	$exclude = array(
		'misc/vertical-tabs.css' => FALSE,
		'modules/aggregator/aggregator.css' => FALSE,
		'modules/block/block.css' => FALSE,
		'modules/book/book.css' => FALSE,
		'modules/comment/comment.css' => FALSE,
		'modules/dblog/dblog.css' => FALSE,
		'modules/file/file.css' => FALSE,
		'modules/filter/filter.css' => FALSE,
		'modules/forum/forum.css' => FALSE,
		'modules/help/help.css' => FALSE,
		'modules/menu/menu.css' => FALSE,
		'modules/node/node.css' => FALSE,
		'modules/openid/openid.css' => FALSE,
		'modules/poll/poll.css' => FALSE,
		'modules/profile/profile.css' => FALSE,
		'modules/search/search.css' => FALSE,
		'modules/statistics/statistics.css' => FALSE,
		'modules/syslog/syslog.css' => FALSE,
		'modules/system/admin.css' => FALSE,
		'modules/system/maintenance.css' => FALSE,
		'modules/system/system.css' => FALSE,
		'modules/system/system.admin.css' => FALSE,
		'modules/system/system.base.css' => FALSE,
		'modules/system/system.maintenance.css' => FALSE,
		'modules/system/system.menus.css' => FALSE,
		'modules/system/system.messages.css' => FALSE,
		'modules/system/system.theme.css' => FALSE,
		'modules/taxonomy/taxonomy.css' => FALSE,
		'modules/tracker/tracker.css' => FALSE,
		'modules/update/update.css' => FALSE,
		'modules/user/user.css' => FALSE,

		'modules/field/theme/field.css' => FALSE,
		'modules/shortcut/shortcut.css' => FALSE,
		'sites/all/modules/contrib/ctools/css/ctools.css' => FALSE,
		'sites/all/modules/contrib/views/css/views.css' => FALSE,
	);
	$css = array_diff_key($css, $exclude);

	// unset($css[drupal_get_path('module','views').'/css/views.css']);
	// unset($css[drupal_get_path('module','ctools').'/css/ctools.css']);

}

/**
 * Newer jQuery
 */
function stevenrovery_js_alter(&$js) {
	if(arg(0) == 'admin' || arg(1) == 'add' || arg(2) == 'edit' || arg(0) == 'file' || arg(0) == 'panels' || arg(0) == 'ctools'){
	} else {
		//$jquery_path = '/' . drupal_get_path('theme','stevenrovery') . '/assets/js/jquery.min.js' ;
		$jquery_path = '//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
    $js['misc/jquery.js']['data'] = $jquery_path ;
		$js['misc/jquery.js']['version'] = '1.8.3' ;
		$js['misc/jquery.js']['type'] = 'external' ;

		// unset($js['misc/jquery.js']);
		// unset($js['misc/jquery.once.js']);
		// unset($js['misc/drupal.js']);

		//dpm($js);

    // print "<pre>";
    // print_r($js);
    // print "</pre>";


		// $jquery_path = '';
    // $js['misc/jquery.js']['data'] = $jquery_path ;
		//$js['misc/jquery.js']['version'] = '1.8.3' ;
		//$js['misc/jquery.js']['type'] = 'external' ;



	}
}

