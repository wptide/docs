<?php

function docpress_make_absolute_urls ($file_contents) {
	$file_iterator = new RecursiveIteratorIterator( new RecursiveDirectoryIterator(DOCS_PATH) );

	$all_files = array_filter( iterator_to_array($file_iterator), function ($file) {
		return $file->isFile() && 'html' === pathinfo($file, PATHINFO_EXTENSION);
	} );
	
	$relative_paths = array_map( function ($file) {
		return str_replace( DOCS_PATH . '/', '', $file );
	}, array_keys( $all_files ) );
	
	$href_match = array_map( function ($file) {
		return 'href="'. $file .'"';
	}, $relative_paths);
	
	$href_replace = array_map( function ($file) {
		return 'href="'. site_url() .'/'. str_replace(['/index.html', 'index.html', '.html'], '', $file) .'"';
	}, $relative_paths );

	$content = preg_replace('#href="((\.\.\/)+)(.+)"#im', 'href="$3"', $file_contents); // replace ../
	$content = str_replace($href_match, $href_replace, $content); // replace all regular matches
	$content = preg_replace('#href="([^\/\#]+)(\#.+)*"#im', 'href="'. get_current_url() .'/$1"', $content); // replace sibling links
	$content = preg_replace('#src="(.+)"#im', 'src="'. DOCS_URI .'/$1"', $content); 

	return $content;
}