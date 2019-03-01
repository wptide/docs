<?php

// Define paths
define( 'DOCS_URI', get_stylesheet_directory_uri() . '/_docpress' );
define( 'DOCS_PATH', dirname(__FILE__) . '/_docpress' );

// Require theme functions
require_once( 'functions/enqueue-styles.php' );
require_once( 'functions/enqueue-scripts.php' );

// Helpers
require_once( 'functions/get-current-url.php' );

// Docpress
require_once( 'functions/docpress-get-dirs.php' );
require_once( 'functions/docpress-get-file-path.php' );
require_once( 'functions/docpress-make-absolute-urls.php' );

define( 'DOCS_FILE_PATH', docpress_get_file_path() );

// Remove unused scripts & styles.
add_action('init', function() {
	global $pagenow;

	if ( 'wp-login.php' !== $pagenow && ! is_admin() ) {
		wp_deregister_script( 'wp-embed' );
		wp_deregister_script( 'jquery' );
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
	}
} );

// Block 301 redirect.
add_filter( 'redirect_canonical', function( $redirect_url, $requested_url ) {
	if ( strpos( $requested_url, 'api/tide/v1' ) === false ) {
		return '';
	}
}, 10, 2 );

/**
 * Filter to override a 404.
 *
 * The links are actually 404 errors, the pages don't exist really. We're faking status 200
 * We just use the routes to pass in info on what file we want to include within index.php.
 */
add_filter( 'template_redirect', function() {
	global $wp_query;

	if ( file_exists( DOCS_FILE_PATH ) ) {
		add_filter( 'wp_title', function( $title ) {
			$title     = 'Tide Docs';
			$fileparts = explode( '/', get_current_url() );
			$page      = end( $fileparts );
			$new_title = ucwords( str_replace( '-', ' ', $page ) );

			if ( $new_title ) {
				if ( 'Gcp' === $new_title ) {
					$new_title = 'Google Cloud Platform';
				} else if ( 'Aws' === $new_title ) {
					$new_title = 'Amazon Web Services';
				} else if ( 'Search' === $new_title ) {
					$new_title = 'API Search';
				} else if ( 'Api' === $new_title ) {
					$new_title = 'API';
				} else if ( 'Phpcs Server' === $new_title ) {
					$new_title = 'PHPCS Server';
				}

				$title =  "$title — $new_title";
			}

			return $title;
		}, 10 );
		status_header( 200 );
		$wp_query->is_404 = false;
	}
} );

/**
 * Filter to override a 404.
 *
 * The links are actually 404 errors, the pages don't exist really. We're faking status 200
 * We just use the routes to pass in info on what file we want to include within index.php.
 */
add_filter( 'body_class', function( $classes ) {
	global $wp_query;

	if ( strpos( DOCS_FILE_PATH, '404.html' ) !== false && file_exists( DOCS_FILE_PATH ) ) {
		$classes[] = 'error404';
	}

	if ( strpos( DOCS_FILE_PATH, 'search.html' ) !== false && file_exists( DOCS_FILE_PATH ) ) {
		$classes[] = 'is-search';
	}

	return $classes;
} );

/**
 * Add GA tracking code to the HEAD.
 */
add_action( 'wp_head', function() {
	if ( strpos( get_home_url(), 'wptide.org' ) !== false ) { ?>

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-135375588-1"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'UA-135375588-1');
</script>

	<?php }
}, 0 );

// Add a column to the edit post list
add_filter( 'manage_edit-audit_columns', 'add_new_columns' );
/**
 * Add new columns to the post table
 *
 * @param Array $columns - Current columns on the list post
 */
function add_new_columns( $columns ) {
 	$column_meta = array( 'meta' => 'Report Meta' );
	$columns = array_slice( $columns, 0, 2, true ) + $column_meta + array_slice( $columns, 2, NULL, true );
	return $columns;
}

/**
 * Add the column scripts and styles.
 */
add_filter( 'admin_footer', function() { ?>
<style>
.toggle-meta {
	cursor: pointer;
}
</style>
<script>
(function( $ ){
	$( '.report-meta' ).prepend( '<a class="toggle-meta">Show</a>' );
	$( '.report-meta' ).children( 'pre' ).hide();

	$( '.toggle-meta' ).on( 'click', function( e ){
		e.preventDefault();

		if ( 'Hide' === $( this ).text() ) {
			$( this ).text( 'Show' );
			$( this ).next('pre').hide();
		} else {
			$(this).text( 'Hide' );
			$( this ).next('pre').show();
		}
	} );
} )( jQuery );
</script>
<?php }, 999 );

// Add action to the manage post column to display the data
add_action( 'manage_audit_posts_custom_column' , 'custom_columns' );
/**
 * Display data in new columns
 *
 * @param  $column Current column
 *
 * @return Data for the column
 */
function custom_columns( $column ) {
	global $post;
	switch ( $column ) {
		case 'meta':
			$data = array();

			$meta = get_post_meta( $post->ID, '_audit_phpcs_wordpress', true );
			if ( isset( $meta['raw'] ) ) {
				$data['phpcs_wordpress'] = $meta['raw'];
			}

			$meta = get_post_meta( $post->ID, '_audit_phpcs_phpcompatibility', true );
			if ( isset( $meta['raw'] ) ) {
				$data['phpcs_phpcompatibility'] = $meta['raw'];
			}

			$meta = get_post_meta( $post->ID, '_audit_lighthouse', true );
			if ( isset( $meta['raw'] ) ) {
				$data['lighthouse'] = $meta['raw'];
			}

			if ( $data ) { ?>
				<div class="report-meta">
					<pre><?php echo json_encode( $data, JSON_PRETTY_PRINT ); ?></pre>
				</div>
			<?php }
		break;
	}
}