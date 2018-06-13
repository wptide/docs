<?php

// Define paths
define('DOCS_URI', get_stylesheet_directory_uri() . '/_docpress');
define('DOCS_PATH', dirname(__FILE__) . '/_docpress');

// Require theme functions
require_once( 'functions/enqueue-styles.php' );
require_once( 'functions/enqueue-scripts.php' );
require_once( 'functions/get-current-url.php' );
require_once( 'functions/docpress-get-file-path.php' );
require_once( 'functions/docpress-make-absolute-urls.php' );
