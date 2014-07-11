<?php
/**
 * Implements hook_form_FORM_ID_alter().
 *
 * @param $form
 *	 The form.
 * @param $form_state
 *	 The form state.
 */
function stevenrovery_form_system_theme_settings_alter(&$form, &$form_state) {


  //social footer links
	$form['stevenrovery_settings'] = array(
		'#type' => 'fieldset',
		'#title' => t('Site Information'),
		'#description'	 => t("Information for the footer contact block."),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE
	);

	$form['stevenrovery_settings']['contact_blurb'] = array(
		'#type' => 'textarea',
		'#title' => t('Contact Blurb'),
		'#default_value' => theme_get_setting('contact_blurb'),
		'#description'	 => t("This is the blurb on the footer about availability.")
	);

	$form['stevenrovery_settings']['contact_text'] = array(
		'#type' => 'textfield',
		'#title' => t('Contact Text'),
		'#default_value' => theme_get_setting('contact_text'),
		'#description'	 => t("This is what comes right before the email and phone number.")
	);

	$form['stevenrovery_settings']['contact_phone'] = array(
		'#type' => 'textfield',
		'#title' => t('Contact Phone'),
		'#default_value' => theme_get_setting('contact_phone'),
		'#description'	 => t("This is the phone number for the contact block.")
	);

	$form['stevenrovery_settings']['contact_email'] = array(
		'#type' => 'textfield',
		'#title' => t('Contact Email'),
		'#default_value' => theme_get_setting('contact_email'),
		'#description'	 => t("This is the email for the contact block.")
	);

}