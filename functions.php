<?php

// Define paths
define('DOCS_URI', get_stylesheet_directory_uri() . '/_docpress');
define('DOCS_PATH', dirname(__FILE__) . '/_docpress');

// Require theme functions
require_once( 'functions/enqueue-styles.php' );
require_once( 'functions/enqueue-scripts.php' );

// Helpers
require_once( 'functions/get-current-url.php' );

// Docpress
require_once( 'functions/docpress-get-dirs.php' );
require_once( 'functions/docpress-get-file-path.php' );
require_once( 'functions/docpress-make-absolute-urls.php' );

// Block 301 redirect.
add_filter( 'redirect_canonical', function( $redirect_url, $requested_url ) {
    if ( strpos( $requested_url, 'api/tide/v1' ) === false ) {
        return '';
    }
}, 10, 2 );
