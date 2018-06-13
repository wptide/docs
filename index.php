<?php
/**
 * The main template file
 */

$file = docpress_get_file_path();

// The links are actually 404 as those pages doesn't exist really. We're faking status 200
// We just use the routes to pass an info on what file we want to include within index.php
if (file_exists($file)) {
	header('HTTP/1.1 200 OK');
}


get_header();

	if (file_exists($file)) {
		echo docpress_make_absolute_urls( 
			file_get_contents($file)
		);
	} else {
		echo docpress_make_absolute_urls(
			file_get_contents(dirname(__FILE__) . '/docs-404.html')
		);
	}

get_footer();
