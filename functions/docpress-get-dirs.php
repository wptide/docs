<?php

/**
 * Retrieve a list of relative directory paths from the DOCS_PATH directory.
 *
 * @return array List of relative directory paths.
 */
function docpress_get_dirs() {
	// Create a directory iterator for the DOCS_PATH directory.
	$dir_iterator = new RecursiveDirectoryIterator( DOCS_PATH );

	// Get the current URL's relative path (not used in this function currently).
	$relative_url = str_replace( site_url( '/' ), '', get_current_url() );

	// Filter the iterator to include only directories.
	$all_dirs = array_filter(
		iterator_to_array( $dir_iterator ),
		function ( $file ) {
			return $file->isDir();
		}
	);

	// Convert absolute paths to relative paths by removing the DOCS_PATH prefix.
	$relative_dirs = array_map(
		function ( $file ) {
			return str_replace( DOCS_PATH . '/', '', $file );
		},
		array_keys( $all_dirs )
	);

	return str_replace( '//', '/', $relative_dirs );
}
