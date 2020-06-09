<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "page" div.
 * 
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta name="description" content="Automated insight into WordPress themes and plugins">
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
		<?php wp_head(); ?>
	</head>
	<body <?php body_class('-menu-visible'); ?>>

		<div class="page">
