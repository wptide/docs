<?php
/**
 * The main template file
 */

get_header();

	$file = $_SERVER[REQUEST_URI] != '/' ? $_SERVER[REQUEST_URI] : '/index';
	$file = substr($file, -1) == '/' ? $file . 'index' : $file;

	include('_docpress' . $file . '.html');

get_footer();
