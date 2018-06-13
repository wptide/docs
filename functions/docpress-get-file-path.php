<?php

function docpress_get_file_path () {
	$relative_url = str_replace(site_url() .'/', '', get_current_url());
	$filename = ( '' === $relative_url) ? 'index'
		: in_array($relative_url, docpress_get_dirs()) ? $relative_url .'/index'
		: $relative_url;

	$file = DOCS_PATH .'/'. $filename .'.html';

	return $file;
}