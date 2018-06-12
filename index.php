<?php
/**
 * The main template file
 */

$file = $_SERVER[REQUEST_URI] != '/' ? $_SERVER[REQUEST_URI] : '/index';
$file = substr($file, -1) == '/' ? $file . 'index' : $file;
$file = preg_replace('#\?.+#i', '', $file);
$file = dirname(__FILE__) . '/_docpress' . $file . '.html';

if (file_exists($file)) {
	header('HTTP/1.1 200 OK');
}

get_header();

	if (file_exists($file)) {
		include($file);
		
	} else {

	}

get_footer();
