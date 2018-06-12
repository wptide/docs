<?php
/**
 * The main template file
 */

header('HTTP/1.1 200 OK');
get_header();

	$file = $_SERVER[REQUEST_URI] != '/' ? $_SERVER[REQUEST_URI] : '/index';
	$file = substr($file, -1) == '/' ? $file . 'index' : $file;
	$file = preg_replace('#\?.+#i', '', $file);

	include('_docpress' . $file . '.html');

get_footer();
