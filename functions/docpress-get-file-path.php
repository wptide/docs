<?php

/**
 * Get the full file path of the requested documentation page.
 *
 * @return string Full path to the documentation HTML file.
 */
function docpress_get_file_path() {
	// Get the current URL path relative to the site root.
	$relative_url = str_replace( site_url( '/' ), '', get_current_url() );

	// Determine the filename based on the relative URL:
	// - If the URL is empty, use 'index'
	// - If it matches a directory, append '/index'
	// - Otherwise, use the URL as-is
	$filename = ( '' === $relative_url )
		? 'index'
		: ( in_array( $relative_url, docpress_get_dirs(), true )
			? $relative_url . '/index'
			: $relative_url );

	$file = DOCS_PATH . '/' . $filename . '.html';

	return str_replace( '//', '/', $file );
}
