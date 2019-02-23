<?php
/**
 * The main template file
 */

get_header();

	if ( file_exists( DOCS_FILE_PATH ) ) {
		echo docpress_make_absolute_urls( 
			file_get_contents( DOCS_FILE_PATH )
		);
	} else {
		echo docpress_make_absolute_urls(
			file_get_contents( DOCS_PATH . '/404.html' )
		);
	}

get_footer();
