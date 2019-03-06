<?php

function docpress_make_absolute_urls ($file_contents) {
	$file_iterator = new RecursiveIteratorIterator( new RecursiveDirectoryIterator(DOCS_PATH . '/') );

	$all_files = array_filter( iterator_to_array($file_iterator), function ($file) {
		return $file->isFile() && 'html' === pathinfo($file, PATHINFO_EXTENSION);
	} );

	$relative_paths = array_map( function ($file) {
		$path = str_replace( DOCS_PATH . '/', '', $file );
		if ( $path ) {
			return $path;
		}
	}, array_keys( $all_files ) );

	$href_match = array_map( function ($file) {
		return 'href="'. $file .'"';
	}, $relative_paths);

	$href_replace = array_map( function ($file) {
		return 'href="'. site_url() . '/' . str_replace(array('/index.html', 'index.html', '.html', '/index'), '', $file) .'"';
	}, $relative_paths );

	$parts = explode( '/', get_current_url() );
	$files = array(
		'contributing',
		'help',
		'local-development',
	);

	// Links
	$content = str_replace($href_match, $href_replace, $file_contents); // replace all relative href file matches with absolute urls and remove .html & index
	if ( in_array( end( $parts ), $files, true ) ) {
		$content = preg_replace('#href="(?!\/|https?:\/\/|mailto:|\#)(.*)"#im', 'href="'. site_url() .'/$1"', $content); // replace relative links inside root level files to other root level files
	}
	$content = preg_replace('#href="(?:\.\.\/)(.+)"#im', 'href="'. site_url() .'/$1"', $content); // replace ../
	$content = preg_replace('#href="(.+)(?:(\/.*)\.html)"#im', 'href="$1$2"', $content); // replace .html links
	$content = preg_replace('#href="(.+)(\/index)"#im', 'href="$1"', $content); // replace /index links
	$content = preg_replace('#href="(?!mailto:)([^\/\#]+)(\#.+)*"#im', 'href="'. get_current_url() .'/$1"', $content); // replace sibling links
	$content = preg_replace('#href="' . site_url() . '(?:\/\/)(.+)"#im', 'href="' . site_url() . '/$1"', $content); // replace path//file links

	// Images
	$content = preg_replace('#src="(?!https?:\/\/)(?!data:)(.+)"#im', 'src="'. DOCS_URI .'/$1"', $content); // fix relative images
	$content = preg_replace('#src="(.+)(?:\.\.\/)(.+)"#im', 'src="$1$2"', $content); // replace ../

	return $content;
}