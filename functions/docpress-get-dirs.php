<?php

function docpress_get_dirs () {
	$dir_iterator = new RecursiveDirectoryIterator(DOCS_PATH);
	$relative_url = str_replace(site_url() .'/', '', get_current_url());

	$all_dirs = array_filter( iterator_to_array($dir_iterator), function ($file) {
		return $file->isDir();
	} );

	$relative_dirs = array_map( function ($file) {
		return str_replace( DOCS_PATH . '/', '', $file );
	}, array_keys( $all_dirs ) );

	return $relative_dirs;
}