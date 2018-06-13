<?php

function docpress_get_file_path () {
	$dir_iterator = new RecursiveDirectoryIterator(DOCS_PATH);
	$relative_url = str_replace(site_url() .'/', '', get_current_url());

	$all_dirs = array_filter( iterator_to_array($dir_iterator), function ($file) {
		return $file->isDir();
	} );

	$relative_dirs = array_map( function ($file) {
		return str_replace( DOCS_PATH . '/', '', $file );
	}, array_keys( $all_dirs ) );

	$filename = ( '' === $relative_url) ? 'index'
		: in_array($relative_url, $relative_dirs) ? $relative_url .'/index'
		: $relative_url;

	$file = DOCS_PATH .'/'. $filename .'.html';

	return $file;
}